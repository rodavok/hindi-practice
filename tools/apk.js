"use strict";
// Builds dist/hindi-practice.apk: the page from tools/build.js plus android/shim.js, in a one-screen
// WebView app (android/). No Gradle: aapt2, javac, d8, zipalign and apksigner run directly.
// Usage: node tools/apk.js
// Needs .toolchain/ (gitignored): jdk/ (a JDK 17+), sdk/build-tools/ (build-tools 35) and sdk/platform/ (android-35).
// The signing key is android/keystore/ (gitignored, made on the first run). Keep it: every later APK must be
// signed with the same key to install over the old one and keep the app's progress.
const fs = require("fs"), path = require("path"), crypto = require("crypto"), {execFileSync} = require("child_process");
const {ROOT} = require("./lib");

const TC = path.join(ROOT, ".toolchain"), BT = path.join(TC, "sdk/build-tools"), JAR = path.join(TC, "sdk/platform/android.jar");
const bin = n => path.join(TC, "jdk/bin", n);
const AND = path.join(ROOT, "android"), OUT = path.join(ROOT, "dist/apk-build"), APK = path.join(ROOT, "dist/hindi-practice.apk");
const KS = path.join(AND, "keystore"), KSFILE = path.join(KS, "release.jks"), KSPASS = path.join(KS, "password.txt");
const MIN_SDK = 26, TARGET_SDK = 34; // 34: Android 15 would force edge-to-edge drawing at 35, which the page doesn't expect
const run = (cmd, args) => execFileSync(cmd, args, {stdio: ["ignore", "pipe", "inherit"], env: {...process.env, JAVA_HOME: path.join(TC, "jdk"), PATH: path.join(TC, "jdk/bin") + ":" + process.env.PATH}}).toString();

for (const p of [bin("javac"), path.join(BT, "aapt2"), path.join(BT, "d8"), JAR])
  if (!fs.existsSync(p)) { console.error(`Missing ${path.relative(ROOT, p)}. See the header of tools/apk.js.`); process.exit(1); }

// 1. The page: the normal build, plus the Android shim after the engine.
execFileSync(process.execPath, [path.join(ROOT, "tools/build.js")], {stdio: "inherit"});
const page = fs.readFileSync(path.join(ROOT, "dist/index.html"), "utf8");
const shim = fs.readFileSync(path.join(AND, "shim.js"), "utf8");
const html = page.replace(/<\/body>\s*<\/html>\s*$/i, () => `<script>\n${shim}</script>\n</body>\n</html>\n`);
if (html === page) throw new Error("couldn't find </body> in dist/index.html");
fs.rmSync(OUT, {recursive: true, force: true});
fs.mkdirSync(path.join(OUT, "assets"), {recursive: true});
fs.writeFileSync(path.join(OUT, "assets/index.html"), html);

// Version: the code only has to go up for Android to accept an update; minutes since 2026 does that.
const code = Math.floor((Date.now() - Date.UTC(2026, 0, 1)) / 60000);
const name = new Date().toISOString().slice(0, 10) + "-" + crypto.createHash("sha256").update(html).digest("hex").slice(0, 7);

// 2. Resources and manifest.
run(path.join(BT, "aapt2"), ["compile", "--dir", path.join(AND, "res"), "-o", path.join(OUT, "res.zip")]);
const unsigned = path.join(OUT, "unsigned.apk");
run(path.join(BT, "aapt2"), ["link", "-I", JAR, "--manifest", path.join(AND, "AndroidManifest.xml"),
  "--min-sdk-version", String(MIN_SDK), "--target-sdk-version", String(TARGET_SDK),
  "--version-code", String(code), "--version-name", name, "-A", path.join(OUT, "assets"),
  "-o", unsigned, path.join(OUT, "res.zip")]);

// 3. Code: Java → class files → classes.dex, added to the APK.
const javaFiles = [];
(function walk(d){ for (const f of fs.readdirSync(d)){ const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith(".java")) javaFiles.push(p); } })(path.join(AND, "src"));
fs.mkdirSync(path.join(OUT, "classes"));
run(bin("javac"), ["--release", "11", "-Xlint:-options", "-classpath", JAR, "-d", path.join(OUT, "classes"), ...javaFiles]);
const classFiles = [];
(function walk(d){ for (const f of fs.readdirSync(d)){ const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith(".class")) classFiles.push(p); } })(path.join(OUT, "classes"));
fs.mkdirSync(path.join(OUT, "dex"));
run(path.join(BT, "d8"), ["--release", "--min-api", String(MIN_SDK), "--lib", JAR, "--output", path.join(OUT, "dex"), ...classFiles]);
execFileSync("zip", ["-qj", unsigned, path.join(OUT, "dex/classes.dex")]);

// 4. Align and sign.
const aligned = path.join(OUT, "aligned.apk");
run(path.join(BT, "zipalign"), ["-p", "-f", "4", unsigned, aligned]);
if (!fs.existsSync(KSFILE)){
  fs.mkdirSync(KS, {recursive: true});
  fs.writeFileSync(KSPASS, crypto.randomBytes(18).toString("base64url") + "\n", {mode: 0o600});
  const pw = fs.readFileSync(KSPASS, "utf8").trim();
  run(bin("keytool"), ["-genkeypair", "-keystore", KSFILE, "-alias", "hindi", "-keyalg", "RSA", "-keysize", "3072",
    "-validity", "36500", "-storepass", pw, "-keypass", pw, "-dname", "CN=Hindi Practice"]);
  console.log("Made a new signing key in android/keystore/ (gitignored). Back it up: later APKs must use it.");
}
run(path.join(BT, "apksigner"), ["sign", "--ks", KSFILE, "--ks-key-alias", "hindi", "--ks-pass", "file:" + KSPASS,
  "--out", APK, aligned]); // the key shares the keystore password
run(path.join(BT, "apksigner"), ["verify", APK]);
fs.rmSync(OUT, {recursive: true, force: true});
console.log(`dist/hindi-practice.apk: version ${name} (code ${code}), ${(fs.statSync(APK).size / 1024 / 1024).toFixed(1)} MB`);
