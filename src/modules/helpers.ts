export function logElapsedTime(label: string, startTime: number) {
    const elapsedTimeMs = performance.now() - startTime;
    console.log(`${label}: ${elapsedTimeMs.toFixed(3)}ms`);
}