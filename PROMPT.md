# project A — Kiran Jojare · Firmware Engineer Portfolio

## your starter prompt

Copy everything between the triple-dashes into Claude Code:

---

Build a personal developer portfolio for **Kiran Jojare**, a Firmware Engineer at **Eaton (ARS Connected Solutions)**, Peachtree City, GA.

Read `REQUIREMENTS.md` in this folder first — it has the full architecture, curated project list, experience data, and data schema already defined. Use it as the source of truth.

**stack requirements:**
- Next.js 15 with App Router, TypeScript strict mode, and the `src/` directory layout
- Tailwind CSS dark mode via `class` strategy
- Magic UI components via the `magic` MCP for all animated elements — no hand-rolled animations
- `pnpm` for all package management (never `npm` or `yarn`)
- `lite-youtube-embed` for video embeds (lazy facade pattern — never full YouTube iframe on load)

**workflow requirements:**
- Before writing any code, use `context7` MCP to fetch the latest Next.js 15 App Router docs and current Magic UI component catalog
- When making visual or layout decisions, delegate to the `ui-designer` subagent
- Follow commit conventions from the `everything-claude-code-conventions` skill
- Build one section at a time — show me a plan before writing code

**page structure (single page, smooth scroll):**
1. **Hero** — name, title ("Firmware Engineer"), animated cycling text via Magic UI cycling through: `automotive` · `ev charging` · `industrial` · `rtos` · `bare metal`. Two CTA buttons: "View Projects" + GitHub icon
2. **DIY Projects** (PRIMARY) — filter bar (All | RTOS | Protocol Driver | Wireless | DSP/Motor | EVSE | Tooling) + responsive card grid (1→2→3 col). Featured cards 2x wide. Cards with video get a play button that opens a YouTube modal using lite-youtube-embed
3. **Experience** — vertical timeline, most recent first, with company/title/dates/bullets/tech chips
4. **Skills** — 6-group layered grid, hardware-first order
5. **Contact** — GitHub · LinkedIn · Email icons only, no form

**design direction:**
- Dark mode only, terminal aesthetic — minimal, high-contrast, no gradients
- Accent color: **cyan/teal** (`#06b6d4`)
- Monospace font (`JetBrains Mono` from next/font/google) for all tech labels, chips, code elements
- Sans-serif (`Inter`) for body and headings

**featured projects (Tier 1 — render 2x wide cards, pinned top):**
1. **Electronic Drum Kit** · ESP32 + I2S amp + SD card · FreeRTOS · 7-button polyphonic drum machine, WAV from SD, <10ms latency · GitHub: https://github.com/kiranj26/Electronic_Drum_Using_ESP32 · YouTube: `bkzxeS1yamA`
2. **BLE Gesture Classroom** · EFR32 Blue Gecko · BLE GATT + OTA + gesture/PIR sensing · 32µA low-power mode · GitHub: https://github.com/kiranj26/ECEN-5823-IOT-Embedded-Firmware · YouTube: `NEHYOcTqCPY`
3. **OCPP 1.6 EV Charger** · STM32F4 + ESP32-C3 WiFi bridge · Full OCPP client, POC to production · GitHub: https://github.com/kiranj26/MicroOCPP-on-STM32F4
4. **CAN FD Driver — TI C2000** · TI F280039C · Production CAN FD library with CI + tests · GitHub: https://github.com/kiranj26/ti-f280039c-can-library
5. **RP2040 Project Collection** · Raspberry Pi Pico · Multi-peripheral bring-up, community reference (⭐17) · GitHub: https://github.com/kiranj26/Raspberry-Pi-Pico-RP2040-Projects
6. **C2000 DSP Projects** · TI F28027F Piccolo · Motor control + DSP, torque/speed, PWM-as-DAC (⭐7) · GitHub: https://github.com/kiranj26/C2000-Piccolo-F28027F-Projects

**grid projects (Tier 2 — standard cards):**
7. **ESP32↔STM32 AT Bridge** · ESP32-C3 + STM32F030 · UART multi-chip AT command bridge · GitHub: https://github.com/kiranj26/ESP32-STM32-AT-Command-Interface
8. **CAN Log Parser** · Python tooling · DBC-aware CAN log parser + signal plotter · GitHub: https://github.com/kiranj26/CAN-Log-Parser
9. **Posture Tracker** · ESP32-MINI-1 + MPU-6050 · IMU-based posture correction with BLE feedback · GitHub: https://github.com/kiranj26/Posture-Tracker-Using-ESP32
10. **EVSE Fault Injector** · Test tooling · OCPP/ISO-15118 fault injection for EV charger compliance · GitHub: https://github.com/kiranj26/evse-fault-injector
11. **STM32 PlatformIO Playground** · STM32 various · Peripheral bring-up reference, (⭐5) · GitHub: https://github.com/kiranj26/STM32-PlatformIO-Playground

**experience (most recent first):**
- **Eaton** · Firmware Engineer · Aug 2024–Present · Peachtree City, GA
  - Smart Breaker 2.0 droop control — STM32G0 + ESP32 + FreeRTOS + TDD, deployed in DER systems
  - In-house OCPP 1.6 stack — owned full lifecycle from POC to production
  - Customer Success lead — field issue triage, root cause analysis
- **Danfoss Editron** · FW Engineering Intern · Jan 2024–Aug 2024 · Longmont, CO
  - BLDC motor controller firmware — TI 280x DSPs, CAN + RS232
  - DAQ fault injection tool — reduced Dyno testing time by 30%
  - IGBT Gate Driver diagnostics — SPI state machine on UCC5870Q1
- **Canoo** · Embedded Platform SW Intern · May 2023–Aug 2023 · Torrance, CA
  - CAN Library 29-bit ID support for STM32SPC56 ECU
  - OTA restructure on STMSPC58 — seed-key exchange, CAN + DoIP
- **CU Boulder** · Student FW Engineer · Aug 2022–Apr 2023 · Boulder, CO
  - SWARM-EX CubeSat firmware — Aptina MT9 camera + Pocket Beagle + dsPIC33 via I2C/UART
- **ZF Friedrichshafen AG** · Senior Engineer · Jun 2021–Jul 2022 · Hyderabad, India
  - Cubi-X vehicle motion firmware — NXP S32K3, ASIL-D/C, ISO 26262
  - AUTOSAR MCAL integration on NXP S32K3
- **KPIT Technologies** · Embedded Software Engineer · Mar 2019–May 2021 · Pune, India
  - ECM features for Cummins — RH850 F1H/F1K, 15% MCDC improvement
  - NOx sensor RTOS firmware — RH850 + Simulink/Stateflow + PID

**skills (hardware-first order):**
- MCUs & Silicon: STM32G0/F4/SPC5 · NXP S32K3 · TI C2000/F280x · Renesas RH850 · ESP32 · RP2040 · EFR32 Blue Gecko
- RTOS: FreeRTOS · Zephyr
- Protocols: CAN · CAN FD · LIN · UART · SPI · I2C · USB · BLE · DoIP · OCPP · MQTT
- Standards: ISO 26262 · AUTOSAR · MISRA C · J-MAAB
- Debug & Toolchain: JTAG · GDB · OpenOCD · CANoe · CANalyzer · Code Composer Studio · STMCube
- Languages: C · C++ · Assembly · Python · MATLAB/Simulink · Bash

**contact:**
- GitHub: https://github.com/kiranj26
- LinkedIn: https://www.linkedin.com/in/kiran-jojare-embedded-system/
- Email: kijo7257@colorado.edu

**deployment workflow (do at the end):**
1. Run `pnpm build` locally and fix any errors
2. Use the `github` MCP to create a new public repo named `portfolio` under kiranj26 and push
3. Use the `vercel` MCP to deploy from that GitHub repo
4. Give me the final production URL

---

## done checklist
- [ ] `pnpm dev` runs and site loads
- [ ] Magic UI animation visible in Hero
- [ ] Featured project cards show video play buttons (drum kit + gesture classroom)
- [ ] Filter bar works on projects section
- [ ] Experience timeline populated with all 6 roles
- [ ] Looks good on 375px mobile viewport
- [ ] Pushed to GitHub via `github` MCP
- [ ] Deployed to Vercel via `vercel` MCP
- [ ] Live URL works
