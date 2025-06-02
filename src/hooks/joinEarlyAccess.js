export function joinEarlyAccess() {
  const notify = async (email) => { // Still need to replace with actual API call
    console.log('Early access email submitted:', email);
    return new Promise((resolve) => setTimeout(resolve, 500));
  };
  return { notify };
}