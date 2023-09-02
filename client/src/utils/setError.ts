export const setError = (element: HTMLInputElement, msg: string) => {
  const inpController = element.parentElement! as HTMLDivElement;
  inpController.querySelector(".errdisplay")!.innerHTML = msg;
};
