export function cleanStylesFromDOM(): void {
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  const styles: HTMLCollectionOf<HTMLStyleElement> | [] = head.getElementsByTagName('style');

  for (let i: number = 0; i < styles.length; i++) {
    head.removeChild(styles[i]);
  }
}