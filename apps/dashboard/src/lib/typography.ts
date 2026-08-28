/**
 * TechFirm Dashboard Typography Standard Scale
 *
 * Page Titles:        text-2xl font-bold tracking-tight
 * Section Headings:   text-base font-semibold tracking-tight (or uppercase section labels: text-xs font-semibold tracking-wider uppercase)
 * Card Titles:        text-sm font-semibold
 * Dialog / Sheet:     text-lg font-semibold
 * Table Headers:      text-xs font-medium text-muted-foreground
 * Table Data Cells:   text-xs font-normal text-foreground (primary title in cell: font-medium, secondary: text-muted-foreground)
 * Form Field Labels:  text-xs font-medium text-foreground
 * Helper / Muted:     text-[11px] font-normal text-muted-foreground
 * Badges / Tags:      text-[10px] font-medium
 * Buttons / Tabs:     text-xs font-medium (action buttons)
 * Stats Metric Value: text-2xl font-bold font-mono / text-2xl font-bold
 */

export const TYPOGRAPHY = {
  pageTitle: "text-2xl font-bold tracking-tight text-foreground",
  sectionHeading: "text-base font-semibold tracking-tight text-foreground",
  sectionLabel: "text-xs font-semibold tracking-wider uppercase text-muted-foreground",
  cardTitle: "text-sm font-semibold text-foreground",
  dialogTitle: "text-lg font-semibold text-foreground",
  tableHeader: "text-xs font-medium text-muted-foreground",
  tableCellTitle: "text-xs font-medium text-foreground",
  tableCellMuted: "text-[11px] font-normal text-muted-foreground",
  formLabel: "text-xs font-medium text-foreground",
  formHelper: "text-[11px] font-normal text-muted-foreground",
  badge: "text-[10px] font-medium",
  button: "text-xs font-medium"
} as const;
