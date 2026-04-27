# Portfolio Site — System Requirements
# Architect: Kiran Jojare · Firmware Engineer @ Eaton (ARS Connected Solutions)
# Sources: GitHub profile (kiranj26) + Resume scrape · April 27 2026

---

## 1. Subject Profile (scraped from resume + GitHub)

### Identity
- **Name:** Kiran Jojare (He/Him)
- **Current Role:** Firmware Engineer @ Eaton, Peachtree City, GA (Aug 2024 – Present)
- **Education:** MS ECE, University of Colorado Boulder (GPA 3.7) · PG Diploma Embedded Systems, CDAC India · BTech Electronics, India
- **GitHub:** github.com/kiranj26
- **LinkedIn:** linkedin.com/in/kiran-jojare-embedded-system

### Career arc (6 years, 5 companies, 3 countries)
```
Mar 2019  Embedded Software Engineer · KPIT Technologies · Pune, India
Jun 2021  Senior Engineer · ZF Friedrichshafen AG · Hyderabad, India
Aug 2022  Student Firmware Engineer · CU Boulder (SWARM-EX CubeSat)
May 2023  Embedded Platform SW Intern · Canoo · Torrance, CA
Jan 2024  Firmware Engineering Intern · Danfoss Editron · Longmont, CO
Aug 2024  Firmware Engineer · Eaton · Peachtree City, GA (current)
```

### Silicon fingerprint (hardware touched across career)
STM32G0x · STM32F4x · STM32SPC5x · NXP S32K3 · TI F280039C · TI TMS320F2802 ·
TI F28027F · Renesas RH850 · EFR32 Blue Gecko · ESP32 · RP2040 · Beaglebone Black ·
Jetson Nano · AT89C51 · dsPIC33

### Protocol depth
CAN · CAN FD · LIN · UART/SCI · SPI · I2C · USB · BLE (GATT) · DoIP · OCPP 1.6 ·
MQTT · TCP/IP · UDP · DMA · PWM · ADC/DAC

### Standards & methodologies
ISO 26262 (ASIL-D/C) · AUTOSAR · MISRA C · J-MAAB · TDD · HIL testing · MCDC

---

## 2. System Overview

A portfolio site that makes one thing clear in under 5 seconds:
> "This person has shipped firmware on 10+ silicon families across automotive, industrial, space, and EV charging — and builds hardware projects on weekends."

### Three audiences, three reads
| Audience | What they need to see | Where they find it |
|---|---|---|
| Recruiter / Hiring Manager | Title, employer, years of experience, domain keywords | Hero + Experience section |
| Peer Firmware Engineer | Protocol depth, silicon breadth, real hardware evidence | DIY Projects + GitHub links |
| Industrial / Automotive Domain | Standards (ISO 26262, AUTOSAR, OCPP), company names | Experience section bullets |

### Information hierarchy (deliberate ordering)
```
1. Hero            — who you are, one-liner, immediate domain anchoring
2. DIY Projects    — passion + range (what you build voluntarily)
3. Experience      — credibility (where you've shipped)
4. Skills          — fills in the mental model
5. Contact         — action layer
```
DIY first because it's your rarest signal. Any engineer can list Eaton and ZF.
Not every engineer builds a polyphonic drum kit with FreeRTOS on a weekend.

---

## 3. Top-Level System Requirements

### 3.1 Identity & Hero (REQ-ID)
- REQ-ID-01: Hero must show name, title ("Firmware Engineer"), and current employer above the fold — no scroll
- REQ-ID-02: One-liner must be domain-specific: e.g. *"6 years shipping firmware on bare metal — automotive, EV, industrial, space"*
- REQ-ID-03: Animated text via Magic UI cycling through key domains: `automotive` · `ev charging` · `industrial` · `rtos` · `bare metal`
- REQ-ID-04: CTA buttons: "View Projects" (scrolls to DIY) + GitHub icon link

### 3.2 DIY Projects (REQ-DIY) — PRIMARY SECTION
- REQ-DIY-01: Unlimited project count — grid handles 3–12 cards via responsive layout
- REQ-DIY-02: Each card: title · target hardware · domain tag · one-sentence impact · tech stack chips · GitHub link · optional video play button
- REQ-DIY-03: Domain filter bar: `All` · `RTOS` · `Protocol Driver` · `Wireless` · `DSP/Motor` · `EVSE` · `Tooling`
- REQ-DIY-04: Featured cards (Tier 1) render at 2x width — same data model, different render size
- REQ-DIY-05: Tech chips visually split: firmware layer (C/C++, FreeRTOS, HAL) vs tooling (CMake, GDB, CANoe)
- REQ-DIY-06: Video play button on cards that have demo footage — clicking opens modal, never auto-plays

### 3.3 Demo Video (REQ-VIDEO)
- REQ-VIDEO-01: Videos hosted on YouTube (unlisted) — not in the repo, not on Vercel
- REQ-VIDEO-02: Embed via lightweight facade (no full YouTube iframe on page load — use `lite-youtube-embed`)
- REQ-VIDEO-03: Thumbnail lazy-loaded — never blocks First Contentful Paint
- REQ-VIDEO-04: Mobile: modal goes full-screen
- REQ-VIDEO-05: Cards without video degrade gracefully — no empty placeholder

### 3.4 Experience (REQ-EXP) — SECONDARY SECTION
- REQ-EXP-01: Vertical timeline — chronological, most recent first
- REQ-EXP-02: Each role: company · title · dates · location · 2–3 quantified bullets · tech chips
- REQ-EXP-03: All 5 roles included (KPIT → ZF → CU Boulder → Canoo → Danfoss → Eaton)
- REQ-EXP-04: Standards badges per role where applicable: ISO 26262 / AUTOSAR / MISRA C / OCPP
- REQ-EXP-05: Section comes AFTER DIY projects

### 3.5 Skills (REQ-SKILL)
- REQ-SKILL-01: Grouped by layer, hardware-first order:
  ```
  MCUs & Silicon     STM32G0/F4/SPC5 · NXP S32K3 · TI C2000/F280x · Renesas RH850 · ESP32 · RP2040
  RTOS               FreeRTOS · Zephyr
  Protocols          CAN · CAN FD · LIN · UART · SPI · I2C · USB · BLE · DoIP · OCPP · MQTT
  Standards          ISO 26262 · AUTOSAR · MISRA C · J-MAAB
  Debug & Toolchain  JTAG · GDB · OpenOCD · CANoe · CANalyzer · Code Composer Studio · STMCube
  Languages          C · C++ · Assembly · Python · MATLAB/Simulink · Bash
  ```
- REQ-SKILL-02: Languages listed LAST — you're a systems engineer, not a language-focused dev

### 3.6 Contact (REQ-CONTACT)
- REQ-CONTACT-01: GitHub (primary)
- REQ-CONTACT-02: LinkedIn
- REQ-CONTACT-03: Email (kijo7257@colorado.edu)
- REQ-CONTACT-04: Phone optional — omit from public site
- REQ-CONTACT-05: No contact form

### 3.7 Visual Design (REQ-UX)
- REQ-UX-01: Dark mode by default, no toggle needed
- REQ-UX-02: Minimal, high-contrast — think terminal aesthetic, not marketing site
- REQ-UX-03: Monospace font for all tech labels, stack chips, code snippets
- REQ-UX-04: Magic UI animation in hero — animated cycling text for domain keywords
- REQ-UX-05: Fully responsive: 1-col mobile → 2-col tablet → 3-col desktop
- REQ-UX-06: Featured project cards span 2 columns on desktop

### 3.8 Performance (REQ-PERF)
- REQ-PERF-01: Lighthouse ≥ 90 mobile
- REQ-PERF-02: FCP < 1.5s on 4G
- REQ-PERF-03: Next.js App Router with RSC — no unnecessary client JS
- REQ-PERF-04: Video thumbnails lazy-loaded, YouTube iframe facade pattern

### 3.9 Deployment (REQ-DEPLOY)
- REQ-DEPLOY-01: Vercel — kiranj26.vercel.app
- REQ-DEPLOY-02: GitHub repo: kiranj26/claude-workshop-starter (forked, already done)
- REQ-DEPLOY-03: HTTPS via Vercel

---

## 4. Tech Stack

```
┌──────────────────────────────────────────────────────────────┐
│  PRESENTATION     Next.js 15 App Router · React Server       │
│                   Components · TypeScript strict             │
│                   ≈ ISR — renders on event, returns          │
├──────────────────────────────────────────────────────────────┤
│  COMPONENT        Magic UI (animations) · Tailwind CSS       │
│                   lite-youtube-embed (video facade)          │
│                   ≈ HAL — between raw HTML and app logic     │
├──────────────────────────────────────────────────────────────┤
│  DATA             Static TypeScript constants (no DB)        │
│                   data/projects.ts  — DIY project defs       │
│                   data/experience.ts — employment history    │
│                   data/skills.ts    — grouped skill list     │
│                   data/contact.ts   — links & handles        │
│                   ≈ NVS/flash — read-only config at boot     │
├──────────────────────────────────────────────────────────────┤
│  MEDIA            YouTube (unlisted) — video hosting         │
│                   GitHub — code links                        │
│                   ≈ external peripheral — accessed by ref    │
├──────────────────────────────────────────────────────────────┤
│  DEPLOYMENT       Vercel CDN · GitHub CI · HTTPS             │
│                   ≈ bootloader + OTA                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Data Schema

```typescript
// types/portfolio.ts

type DomainTag = 'RTOS' | 'Protocol Driver' | 'Wireless' | 'DSP/Motor' | 'EVSE' | 'Tooling' | 'Bring-Up' | 'Space'

type StackLayer = 'firmware' | 'tooling' | 'language' | 'standard'

interface TechChip {
  label: string
  layer: StackLayer
}

interface VideoDemo {
  youtubeId: string       // YouTube video ID (unlisted ok)
  thumbnailUrl?: string   // falls back to YouTube default thumbnail
}

interface Project {
  id: string
  title: string
  hardware: string        // e.g. "STM32F4 + ESP32-C3"
  description: string     // one-sentence "so what"
  tags: DomainTag[]
  stack: TechChip[]
  githubUrl: string
  demoUrl?: string
  video?: VideoDemo
  featured: boolean       // true = 2x wide card, pinned top
}

interface Role {
  company: string
  title: string
  startDate: string       // "2024-08"
  endDate?: string        // undefined = present
  location: string
  bullets: string[]
  stack: TechChip[]
  standards?: string[]    // e.g. ["ISO 26262", "AUTOSAR"]
}

interface SkillGroup {
  category: string
  skills: string[]
}
```

---

## 6. Curated Project Data (from GitHub analysis)

### Tier 1 — Featured (2x cards, pinned top, video priority)

| id | title | hardware | description | video |
|----|-------|----------|-------------|-------|
| `drum-esp32` | Electronic Drum Kit | ESP32 + I2S amp + SD card | 7-button polyphonic drum machine — WAV from SD, FreeRTOS scheduling, <10ms latency. No phone, no laptop. | ✅ `bkzxeS1yamA` |
| `ble-gesture-efr32` | BLE Gesture Classroom | EFR32 Blue Gecko | 32µA low-power BLE device — gesture + PIR sensing, OTA update, C state machines. CU Boulder IoT capstone. | ✅ `NEHYOcTqCPY` |
| `ocpp-stm32f4` | OCPP 1.6 EV Charger | STM32F4 + ESP32-C3 | Full OCPP 1.6 client on STM32F4 via ESP32 WiFi bridge — POC to deployed EV charger. ⭐11 | — |
| `can-library-c2000` | CAN FD Driver — TI C2000 | TI F280039C | Production CAN FD driver library with CI, tests, reusable architecture for industrial DSPs. | — |
| `rp2040-projects` | RP2040 Project Collection | Raspberry Pi Pico | Multi-peripheral bring-up on RP2040 — community reference repo. ⭐17 | — |
| `c2000-piccolo` | C2000 DSP Projects | TI F28027F (Piccolo) | Motor control + DSP — torque/speed control, PWM-as-DAC, signal processing. ⭐7 | — |

### Tier 2 — Grid Cards (standard size)

| id | title | hardware | description |
|----|-------|----------|-------------|
| `esp32-stm32-uart` | ESP32↔STM32 AT Bridge | ESP32-C3 + STM32F030 | Multi-chip UART bridge using AT command protocol — WiFi-enabled STM32 without native WiFi silicon. |
| `can-log-parser` | CAN Log Parser & Plotter | N/A (Python tooling) | DBC-aware CAN log parser with signal plotting — field debugging tool for CAN networks. |
| `posture-esp32` | Posture Tracker | ESP32-MINI-1 + MPU-6050 | IMU-based posture correction with real-time haptic/audio feedback over BLE. |
| `evse-fault-injector` | EVSE Fault Injector | N/A (test tooling) | Open-source fault injection tool for OCPP/ISO-15118 EV charger compliance testing. |
| `ble-gesture-efr32` | BLE Gesture Classroom | EFR32 Blue Gecko | 32µA low-power BLE device with gesture (I2C) + PIR sensing, OTA update, C state machines. **Has demo video.** |
| `stm32-platformio` | STM32 PlatformIO Playground | STM32 (various) | Reference collection for STM32 peripheral bring-up via PlatformIO — 5 stars, community resource. |

### Confirmed YouTube video IDs
```
drum-esp32        → YouTube ID: bkzxeS1yamA  ✅ (Shorts: youtube.com/shorts/bkzxeS1yamA)
ble-gesture-efr32 → YouTube ID: NEHYOcTqCPY  ✅ (youtu.be/NEHYOcTqCPY)
ocpp-stm32f4      → YouTube ID: ____________  (serial monitor capture — record if hardware available)
posture-esp32     → YouTube ID: ____________  (LED/buzzer demo — easy phone recording)
can-log-parser    → YouTube ID: ____________  (screen recording — easiest to add later)
```

---

## 7. Experience Data (from resume)

```
Eaton               Firmware Engineer           Aug 2024–Present   Peachtree City, GA
  • Smart Breaker 2.0 droop control — STM32G0 + ESP32 + FreeRTOS + TDD, deployed in DER systems
  • In-house OCPP 1.6 stack — owned full lifecycle POC to production
  • Customer Success lead — field issue triage, root cause analysis
  Standards: OCPP · TDD · FreeRTOS

Danfoss Editron     FW Engineering Intern       Jan 2024–Aug 2024  Longmont, CO
  • BLDC motor controller firmware — TI 280x DSPs, CAN + RS232
  • DAQ fault injection tool — 30% reduction in Dyno test time
  • IGBT Gate Driver diagnostics — SPI state machine on UCC5870Q1
  Standards: HIL testing · SPI · CAN

Canoo               Embedded Platform SW Intern May 2023–Aug 2023  Torrance, CA
  • CAN Library — 29-bit ID support for STM32SPC56 ECU
  • OTA restructure on STMSPC58 — seed-key exchange, CAN + DoIP
  • CANoe CAPL integration for UDS signal analysis
  Standards: DoIP · UDS · CAN

CU Boulder          Student FW Engineer         Aug 2022–Apr 2023  Boulder, CO
  • SWARM-EX CubeSat — Aptina MT9 camera + Pocket Beagle + dsPIC33 via I2C/UART

ZF Friedrichshafen  Senior Engineer             Jun 2021–Jul 2022  Hyderabad, India
  • Cubi-X vehicle motion firmware — NXP S32K3 · ASIL-D/C · ISO 26262
  • MCAL integration in AUTOSAR on NXP S32K3
  Standards: ISO 26262 · AUTOSAR · MISRA C · J-MAAB

KPIT Technologies   Embedded Software Engineer  Mar 2019–May 2021  Pune, India
  • ECM features for Cummins engines — RH850 F1H/F1K · 15% MCDC improvement
  • NOx sensor RTOS firmware — RH850 + Simulink/Stateflow + PID
  Standards: MISRA C · RTWEC
```

---

## 8. Page Section Architecture

```
<RootLayout>                  ← layout.tsx: fonts, metadata, dark class
  <Navbar />                  ← sticky: "Kiran Jojare" + Projects | Experience | Skills | Contact
  <HeroSection />             ← name · title · animated domain text · CTA buttons
  <DiyProjectsSection />      ← filter bar + responsive grid
    <FilterBar />             ← All | RTOS | Protocol Driver | Wireless | DSP/Motor | EVSE | Tooling
    <ProjectGrid />
      <ProjectCard />         ← hardware · chips · description · links · video button
        <VideoModal />        ← YouTube facade, full-screen on mobile
  <ExperienceSection />       ← vertical timeline, most recent first
    <RoleCard />              ← company · title · dates · bullets · chips · standards badges
  <SkillsSection />           ← 6-group layered grid, hardware-first
  <ContactSection />          ← GitHub · LinkedIn · Email icons only
  <Footer />                  ← copyright · GitHub link
```

---

## 9. Open Questions

- [ ] YouTube video IDs — provide once uploaded (drum kit first)
- [ ] Which projects to mark `featured: true` — using Tier 1 list above as default
- [ ] Custom domain or kiranj26.vercel.app?
- [ ] Hero one-liner — confirm wording or revise
- [ ] Magic UI hero animation component — delegate to `ui-designer` subagent

---

## 10. Build Order

1. `pnpm create next-app@latest` inside `projects/01-portfolio/` — TypeScript + Tailwind + App Router
2. Define `types/portfolio.ts` — lock all interfaces before any component
3. Populate `data/` files — projects, experience, skills, contact (all from this doc)
4. Build `<HeroSection />` — Magic UI animated text
5. Build `<ProjectCard />` + `<VideoModal />` — core reusable unit
6. Build `<DiyProjectsSection />` — FilterBar + ProjectGrid
7. Build `<ExperienceSection />` — RoleCard timeline
8. Build `<SkillsSection />`
9. Build `<ContactSection />` + `<Navbar />` + `<Footer />`
10. Lighthouse audit — fix perf issues
11. Push to GitHub → deploy to Vercel via MCP
