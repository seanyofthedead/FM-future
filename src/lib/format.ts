const usdFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
export const formatCurrency = (v: number | null | undefined) =>
  v == null || !Number.isFinite(v) ? '$--' : usdFmt.format(v)
