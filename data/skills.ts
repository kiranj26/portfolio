import type { SkillGroup } from "@/types/portfolio"

export const skills: SkillGroup[] = [
  {
    category: "MCUs & Silicon",
    skills: [
      "STM32G0/F4/SPC5",
      "NXP S32K3",
      "TI C2000/F280x",
      "Renesas RH850",
      "ESP32",
      "RP2040",
      "EFR32 Blue Gecko",
    ],
  },
  {
    category: "RTOS",
    skills: ["FreeRTOS", "Zephyr"],
  },
  {
    category: "Protocols",
    skills: ["CAN", "CAN FD", "LIN", "UART", "SPI", "I2C", "USB", "BLE", "DoIP", "OCPP", "MQTT"],
  },
  {
    category: "Standards",
    skills: ["ISO 26262", "AUTOSAR", "MISRA C", "J-MAAB"],
  },
  {
    category: "Debug & Toolchain",
    skills: ["JTAG", "GDB", "OpenOCD", "CANoe", "CANalyzer", "Code Composer Studio", "STMCube"],
  },
  {
    category: "Languages",
    skills: ["C", "C++", "Assembly", "Python", "MATLAB/Simulink", "Bash"],
  },
]
