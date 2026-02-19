export const GRID_PATTERNS = [
  // big + smalls
  {
    slots: [
      { col: 1, span: 7 },
      { col: 8, span: 5 },
      { col: 2, span: 7 },
      { col: 8, span: 4 },
    ]
  },

  // 2 vs 2 (balanced)
  {
    slots: [
      { col: 3, span: 3 },
      { col: 6, span: 3 },
      { col: 3, span: 3 },
      { col: 6, span: 3 }
    ]
  },

  // 3 left, 1 right
  {
    slots: [
      { col: 1, span: 4 },
      { col: 1, span: 4 },
      { col: 1, span: 4 },
      { col: 8, span: 4 }
    ]
  },

  // stacked right
  {
    slots: [
      { col: 2, span: 5 },
      { col: 2, span: 5 },
      { col: 8, span: 4 }
    ]
  },
]