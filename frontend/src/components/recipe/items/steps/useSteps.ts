const useSteps = (steps: string[], updateSteps: (steps: string[]) => void) => {
  const setStep = (index: number, newStep: string) => {
    updateSteps(steps.map((step, i) => (index === i ? newStep : step)));
  };

  const addStep = () => {
    updateSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    updateSteps(steps.filter((_, i) => index !== i));
  };

  return { setStep, addStep, removeStep };
};

export default useSteps;
