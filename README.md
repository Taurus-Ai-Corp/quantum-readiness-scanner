<div align="center">

# Q-GRID Scanner

### Open-Source Quantum-Readiness Assessment CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![NIST PQC](https://img.shields.io/badge/NIST-FIPS%20203%2F204-green)](https://csrc.nist.gov/projects/post-quantum-cryptography)

**Scan your infrastructure for quantum computing vulnerabilities. Get a compliance roadmap in minutes.**

[Install](#installation) | [Quick Start](#quick-start) | [Features](#features) | [Enterprise](https://q-grid.net)

</div>

---

## Why Quantum Readiness Matters

- **NIST** mandates PQC migration by 2035
- **SWIFT** requires quantum-safe readiness by 2027
- **EU AI Act** compliance deadline: August 2026
- Quantum computers capable of breaking RSA-2048 expected by 2030-2035

## Installation

```bash
npm install -g q-grid-scanner
# or
npx q-grid-scanner scan
```

## Quick Start

```bash
q-grid-scanner scan .                          # Scan current directory
q-grid-scanner scan . --tls api.example.com    # Include TLS check
q-grid-scanner report --format html            # HTML report
q-grid-scanner compliance --framework nist-pqc # Compliance check
```

## Features

| Feature | Description |
|---------|-------------|
| Crypto Scanner | Detects RSA, ECDSA, Ed25519, AES-128, SHA-1 in code |
| TLS Analyzer | Checks endpoint certificates for quantum vulnerability |
| NIST PQC Check | Maps against FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA) |
| Migration Plan | Prioritized roadmap from vulnerable to quantum-safe |
| CI/CD Integration | SARIF output, GitHub Actions, pre-commit hooks |

## Scoring

| Score | Grade | Status |
|-------|-------|--------|
| 90-100 | A+ | Quantum-ready |
| 70-89 | B | Mostly ready |
| 50-69 | C | Migration needed |
| 0-49 | F | Critical exposure |

## Enterprise: Q-GRID Comply

Need continuous monitoring? **[Q-GRID Comply](https://q-grid.net)** provides automated quantum compliance, ML-DSA certificate rotation, and multi-jurisdiction regulatory reporting.

$500/mo Starter | $1,000/mo Pro | $2,000/mo Enterprise

## License

MIT - [TAURUS AI Corp](https://taurusai.io)

Part of **[Q-GRID QaaS](https://q-grid.net)** - Enterprise quantum-safe infrastructure.
