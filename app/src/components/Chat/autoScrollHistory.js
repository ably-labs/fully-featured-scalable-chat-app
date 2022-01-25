export default (historyElements, ref) => {
  const { length } = historyElements || [];
  const pause = length * 5; // miliseconds to pause while DOM updates

  if (!length || !ref) return null;

  const options = { behavior: "smooth", block: "end", inline: "nearest" };
  const callback = () => ref.current.scrollIntoView(options);

  setTimeout(callback, pause);
  return length;
}
