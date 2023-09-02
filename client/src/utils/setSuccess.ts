export const setSuccess = (element: HTMLInputElement) => {
  const inpController = element.parentElement! as HTMLDivElement;
  inpController.querySelector(".errdisplay")!.innerHTML = "";
};
