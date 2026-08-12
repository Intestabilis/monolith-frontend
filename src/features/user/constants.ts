export const POPULAR_SYSTEMS = [
  "D&D 5e",
  "Pathfinder 2e",
  "Call of Cthulhu",
  "Shadowdark",
  "Mörk Borg",
  "Cyberpunk RED",
  "Vampire: The Masquerade",
  "GURPS",
  "Інше",
];

export const PLAYSTYLES = [
  "Roleplay Heavy",
  "Tactical Combat",
  "Hex-crawl",
  "Mystery/Investigation",
  "Hack & Slash",
  "Casual/Chill",
];

// REVIEW/CHANGE change to some actual colors for systems/playstyles vibes, not just colors from theme
// Styling for badges
export const SYSTEM_STYLES: Record<string, string> = {
  "D&D 5e": "bg-primary-surface border-primary text-text-selected",
  Shadowdark:
    "bg-background-contrast border-border-strong text-text-selected font-bold",
  "Mörk Borg": "bg-warning-surface border-warning-muted text-warning",
  "Cyberpunk RED": "bg-danger-surface border-danger-muted text-danger",
  "Call of Cthulhu": "bg-surface border-success-muted text-success",
};

export const PLAYSTYLE_STYLES: Record<string, string> = {
  "Roleplay Heavy": "bg-success-surface border-success-muted text-success",
  "Tactical Combat": "bg-danger-surface border-danger-muted text-danger",
  "Hex-crawl": "bg-warning-surface border-warning-muted text-warning",
  "Mystery/Investigation":
    "bg-background-contrast border-border-strong text-text-primary",
};

export const TIMEZONES = [
  "GMT-12:00 (International Date Line West)",
  "GMT-11:00 (Midway Island, Samoa)",
  "GMT-10:00 (Hawaii)",
  "GMT-09:00 (Alaska)",
  "GMT-08:00 (Pacific Time - US & Canada)",
  "GMT-07:00 (Mountain Time - US & Canada)",
  "GMT-06:00 (Central Time - US & Canada, Mexico City)",
  "GMT-05:00 (Eastern Time - US & Canada, Bogota)",
  "GMT-04:00 (Atlantic Time - Canada, Caracas, La Paz)",
  "GMT-03:00 (Brasilia, Buenos Aires, Georgetown)",
  "GMT-02:00 (Mid-Atlantic)",
  "GMT-01:00 (Azores, Cape Verde Is.)",
  "GMT+00:00 (London, Edinburgh, Casablanca)",
  "GMT+01:00 (Central European Time, West Africa Time)",
  "GMT+02:00 (Kyiv, Eastern European Time, Cairo, Pretoria)",
  "GMT+03:00 (Istanbul, Riyadh, Baghdad)",
  "GMT+04:00 (Abu Dhabi, Muscat, Baku, Tbilisi)",
  "GMT+05:00 (Islamabad, Karachi, Tashkent)",
  "GMT+05:30 (Chennai, Kolkata, Mumbai, New Delhi)",
  "GMT+06:00 (Astana, Dhaka, Almaty)",
  "GMT+07:00 (Bangkok, Hanoi, Jakarta)",
  "GMT+08:00 (Beijing, Perth, Singapore, Taipei)",
  "GMT+09:00 (Tokyo, Seoul, Osaka, Sapporo)",
  "GMT+10:00 (Eastern Australia, Guam, Vladivostok)",
  "GMT+11:00 (Magadan, Solomon Is., New Caledonia)",
  "GMT+12:00 (Auckland, Wellington, Fiji, Kamchatka)",
  "GMT+13:00 (Nuku'alofa)",
];
