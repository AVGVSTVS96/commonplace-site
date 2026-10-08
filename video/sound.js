const RATE = 48000

const seeded = seed => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), seed | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const noise = (ctx, seconds, random) => {
  const buffer = ctx.createBuffer(1, seconds * ctx.sampleRate, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = random() * 2 - 1
  return buffer
}

function envelope(param, t, peak, attack, release) {
  param.setValueAtTime(0, t)
  param.linearRampToValueAtTime(peak, t + attack)
  param.exponentialRampToValueAtTime(0.0001, t + attack + release)
}

function voices(ctx, master) {
  const hiss = noise(ctx, 1, seeded(0))
  const click = (t, random, level, frequency, q, release) => {
    const source = ctx.createBufferSource()
    source.buffer = hiss
    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = frequency
    filter.Q.value = q
    const gain = ctx.createGain()
    envelope(gain.gain, t, level, 0.001, release)
    source.connect(filter).connect(gain).connect(master)
    source.start(t, random() * 0.8)
    source.stop(t + release + 0.02)
  }
  const tone = (t, notes, level, release) => {
    for (const [hz, amount] of notes) {
      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.value = hz
      const gain = ctx.createGain()
      envelope(gain.gain, t, level * amount, 0.004, release)
      osc.connect(gain).connect(master)
      osc.start(t)
      osc.stop(t + release + 0.05)
    }
  }
  return {
    key: (t, random) => click(t, random, 0.1 + random() * 0.04, 2400 + random() * 1200, 1.4, 0.02),
    enter: (t, random) => click(t, random, 0.18, 1400, 1.0, 0.04),
    row: (t, random) => click(t, random, 0.05, 5200, 2.5, 0.01),
    land: (t, random) => click(t, random, 0.08, 4200, 2.0, 0.016),
    build: t => tone(t, [[880, 1], [1760, 0.25], [2640, 0.06]], 0.28, 0.9),
    answer: t => tone(t, [[659.25, 1], [1318.5, 0.2]], 0.22, 0.8),
    end: t => tone(t, [[440, 1], [880, 0.35], [1320, 0.08]], 0.3, 2.4),
  }
}

async function render() {
  const END = window.END
  const ctx = new OfflineAudioContext(2, Math.ceil((END + 1) * RATE), RATE)
  const master = ctx.createGain()
  master.gain.value = 0.9
  master.connect(ctx.destination)
  const v = voices(ctx, master)
  window.CUES.forEach((cue, i) => v[cue.kind]?.(cue.t, seeded(i + 1)))
  return ctx.startRendering()
}

function wav(buffer) {
  const channels = [buffer.getChannelData(0), buffer.getChannelData(1)]
  const frames = buffer.length
  const bytes = new DataView(new ArrayBuffer(44 + frames * 4))
  const text = (offset, s) => [...s].forEach((c, i) => bytes.setUint8(offset + i, c.charCodeAt(0)))
  text(0, "RIFF")
  bytes.setUint32(4, 36 + frames * 4, true)
  text(8, "WAVEfmt ")
  bytes.setUint32(16, 16, true)
  bytes.setUint16(20, 1, true)
  bytes.setUint16(22, 2, true)
  bytes.setUint32(24, RATE, true)
  bytes.setUint32(28, RATE * 4, true)
  bytes.setUint16(32, 4, true)
  bytes.setUint16(34, 16, true)
  text(36, "data")
  bytes.setUint32(40, frames * 4, true)
  for (let i = 0; i < frames; i++)
    for (let c = 0; c < 2; c++) bytes.setInt16(44 + i * 4 + c * 2, Math.max(-1, Math.min(1, channels[c][i])) * 32767, true)
  return new Uint8Array(bytes.buffer).toBase64()
}

window.soundtrack = async () => ({ cues: wav(await render()) })
