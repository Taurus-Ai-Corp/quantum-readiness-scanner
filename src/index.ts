#!/usr/bin/env node
import { Command } from "commander";
import { scanDirectory } from "./scanners/crypto-deps";

const program = new Command();
program
  .name("q-grid-scanner")
  .description("Quantum-readiness assessment CLI")
  .version("0.1.0");

program
  .command("scan [path]")
  .description("Scan for quantum-vulnerable cryptographic dependencies")
  .option("--tls <endpoint>", "Check TLS endpoint")
  .option("--fail-on <level>", "Exit on: critical, high, medium, low", "critical")
  .action(async (path = ".", opts) => {
    console.log("\n  Q-GRID Scanner v0.1.0 — Quantum Readiness Assessment\n");
    const results = await scanDirectory(path);
    console.log(`  Files scanned: ${results.scannedFiles}`);
    console.log(`  Critical: ${results.critical.length}`);
    console.log(`  High:     ${results.high.length}`);
    console.log(`  Medium:   ${results.medium.length}`);
    console.log(`  Low:      ${results.low.length}`);
    if (results.critical.length > 0) {
      console.log("\n  CRITICAL vulnerabilities:");
      results.critical.slice(0, 10).forEach(v => {
        console.log(`    ${v.file}:${v.line} — ${v.algorithm} (${v.migration})`);
      });
    }
    const total = results.critical.length + results.high.length + results.medium.length + results.low.length;
    const score = Math.max(0, 100 - (results.critical.length * 15) - (results.high.length * 8) - (results.medium.length * 3) - results.low.length);
    console.log(`\n  Quantum Readiness Score: ${Math.min(score, 100)}/100`);
    console.log("  Enterprise: https://q-grid.net\n");
  });

program.parse();
