export default function audioFeatureRange(range) {
  if (range > 0 && range <= 0.5) return 'low';
  else return 'high';
}
