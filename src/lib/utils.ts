export const formatNumber = (value: bigint | undefined) => {
  if (value === undefined) return "Loading...";
  return Number(value.toString()) / 1e18; // bigint를 문자열로 변환 후 Number로 변환
};
