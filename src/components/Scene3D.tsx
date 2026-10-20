import React from 'react';

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

// Renders a lazy 3D scene, or the flat fallback while it loads, without WebGL, or if it throws.
export class Scene3D extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: !webglAvailable() };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('3D scene failed, showing the flat version:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return <React.Suspense fallback={this.props.fallback}>{this.props.children}</React.Suspense>;
  }
}
