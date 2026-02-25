describe('Nested Frames', () => {
  beforeEach(() => {
    cy.visit('/nested_frames')
  })

  // TODO: frameset exists on the page
  // TODO: frame[name="frame-top"] and frame[name="frame-bottom"] are present
  // TODO: Bottom frame body contains "BOTTOM"
  // TODO: Top frame contains nested frames: LEFT, MIDDLE, RIGHT
  // TODO: Verify LEFT frame body contains "LEFT"
  // TODO: Verify MIDDLE frame body contains "MIDDLE"
  // TODO: Verify RIGHT frame body contains "RIGHT"
})
