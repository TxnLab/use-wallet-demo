import '@testing-library/jest-dom/extend-expect'
import 'canvas'

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver
