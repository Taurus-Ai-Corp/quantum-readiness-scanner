import { readFileSync } from "fs";
import { glob } from "glob";
import { join } from "path";

export interface Vulnerability {
  file: string;
  line: number;
  algorithm: string;
  severity: "critical" | "high" | "medium" | "low";
  usage: string;
  migration: string;
}

export interface ScanResults {
  critical: Vulnerability[];
  high: Vulnerability[];
  medium: Vulnerability[];
  low: Vulnerability[];
  totalFiles: number;
  scannedFiles: number;
}

const PATTERNS: Array<{
  re: RegExp;
  algorithm: string;
  severity: Vulnerability["severity"];
  migration: string;
}> = [
  { re: /RSA[_-]?(2048|4096|1024)/gi, algorithm: "RSA", severity: "critical", migration: "Replace with ML-DSA (FIPS 204)" },
  { re: /ECDSA|secp256k1|P-256|prime256v1/gi, algorithm: "ECDSA", severity: "critical", migration: "Replace with ML-DSA (FIPS 204)" },
  { re: /Ed25519|Curve25519|X25519/gi, algorithm: "EdDSA", severity: "critical", migration: "Replace with ML-DSA/ML-KEM" },
  { re: /DiffieHellman|ECDH|createDiffieHellman/gi, algorithm: "DH/ECDH", severity: "critical", migration: "Replace with ML-KEM (FIPS 203)" },
  { re: /AES[_-]?128|aes-128/gi, algorithm: "AES-128", severity: "medium", migration: "Upgrade to AES-256" },
  { re: /SHA[_-]?1(?!\\d)|createHash\\(['"]sha1/gi, algorithm: "SHA-1", severity: "low", migration: "Upgrade to SHA-3" },
  { re: /MD5|createHash\\(['"]md5/gi, algorithm: "MD5", severity: "low", migration: "Upgrade to SHA-3" },
];

const EXTENSIONS = ["**/*.ts", "**/*.js", "**/*.py", "**/*.java", "**/*.go", "**/*.rs", "**/*.yaml", "**/*.json"];

export async function scanDirectory(dirPath: string, maxDepth = 10): Promise<ScanResults> {
  const results: ScanResults = { critical: [], high: [], medium: [], low: [], totalFiles: 0, scannedFiles: 0 };
  const files = await glob(EXTENSIONS.map(e => join(dirPath, e)), {
    ignore: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
  });
  results.totalFiles = files.length;
  for (const file of files) {
    try {
      const lines = readFileSync(file, "utf-8").split("\n");
      results.scannedFiles++;
      for (let i = 0; i < lines.length; i++) {
        for (const { re, algorithm, severity, migration } of PATTERNS) {
          re.lastIndex = 0;
          if (re.test(lines[i])) {
            results[severity].push({
              file: file.replace(dirPath + "/", ""),
              line: i + 1,
              algorithm,
              severity,
              usage: lines[i].trim().substring(0, 100),
              migration,
            });
          }
        }
      }
    } catch { /* skip */ }
  }
  return results;
}
