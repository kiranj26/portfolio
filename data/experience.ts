import type { Role } from "@/types/portfolio"

export const experience: Role[] = [
  {
    company: "Eaton (ARS Connected Solutions)",
    title: "Firmware Engineer",
    startDate: "2024-08",
    location: "Peachtree City, GA",
    bullets: [
      "Smart Breaker 2.0 droop control — STM32G0 + ESP32 + FreeRTOS + TDD, deployed in DER systems",
      "In-house OCPP 1.6 stack — owned full lifecycle from POC to production",
      "Customer Success lead — field issue triage and root cause analysis",
    ],
    stack: [
      { label: "STM32G0", layer: "firmware" },
      { label: "ESP32", layer: "firmware" },
      { label: "FreeRTOS", layer: "firmware" },
      { label: "C", layer: "language" },
    ],
    standards: ["OCPP", "TDD", "FreeRTOS"],
  },
  {
    company: "Danfoss Editron",
    title: "Firmware Engineering Intern",
    startDate: "2024-01",
    endDate: "2024-08",
    location: "Longmont, CO",
    bullets: [
      "BLDC motor controller firmware — TI 280x DSPs, CAN + RS232 communication",
      "DAQ fault injection tool — reduced Dyno test time by 30%",
      "IGBT Gate Driver diagnostics — SPI state machine on UCC5870Q1",
    ],
    stack: [
      { label: "TI C2000", layer: "firmware" },
      { label: "CAN", layer: "firmware" },
      { label: "SPI", layer: "firmware" },
      { label: "C", layer: "language" },
    ],
    standards: ["HIL testing", "SPI", "CAN"],
  },
  {
    company: "Canoo",
    title: "Embedded Platform SW Intern",
    startDate: "2023-05",
    endDate: "2023-08",
    location: "Torrance, CA",
    bullets: [
      "CAN Library — 29-bit extended ID support for STM32SPC56 ECU",
      "OTA restructure on STMSPC58 — seed-key exchange, CAN + DoIP",
      "CANoe CAPL integration for UDS signal analysis",
    ],
    stack: [
      { label: "STM32SPC56", layer: "firmware" },
      { label: "CAN", layer: "firmware" },
      { label: "DoIP", layer: "firmware" },
      { label: "CANoe", layer: "tooling" },
    ],
    standards: ["DoIP", "UDS", "CAN"],
  },
  {
    company: "University of Colorado Boulder",
    title: "Student Firmware Engineer",
    startDate: "2022-08",
    endDate: "2023-04",
    location: "Boulder, CO",
    bullets: [
      "SWARM-EX CubeSat firmware — Aptina MT9 camera + Pocket Beagle + dsPIC33 via I2C/UART",
    ],
    stack: [
      { label: "dsPIC33", layer: "firmware" },
      { label: "Pocket Beagle", layer: "firmware" },
      { label: "I2C", layer: "firmware" },
      { label: "C", layer: "language" },
    ],
    standards: [],
  },
  {
    company: "ZF Friedrichshafen AG",
    title: "Senior Engineer",
    startDate: "2021-06",
    endDate: "2022-07",
    location: "Hyderabad, India",
    bullets: [
      "Cubi-X vehicle motion firmware — NXP S32K3, ASIL-D/C, ISO 26262",
      "AUTOSAR MCAL integration on NXP S32K3",
    ],
    stack: [
      { label: "NXP S32K3", layer: "firmware" },
      { label: "AUTOSAR", layer: "standard" },
      { label: "C", layer: "language" },
    ],
    standards: ["ISO 26262", "AUTOSAR", "MISRA C", "J-MAAB"],
  },
  {
    company: "KPIT Technologies",
    title: "Embedded Software Engineer",
    startDate: "2019-03",
    endDate: "2021-05",
    location: "Pune, India",
    bullets: [
      "ECM features for Cummins engines — RH850 F1H/F1K, 15% MCDC improvement",
      "NOx sensor RTOS firmware — RH850 + Simulink/Stateflow + PID control",
    ],
    stack: [
      { label: "RH850", layer: "firmware" },
      { label: "MATLAB/Simulink", layer: "tooling" },
      { label: "C", layer: "language" },
    ],
    standards: ["MISRA C", "RTWEC"],
  },
]
