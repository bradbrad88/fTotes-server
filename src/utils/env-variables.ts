export default (envVars: Array<string> | string) => {
  const check = (variable: string) => {
    if (!process.env[variable]) {
      throw new Error("Could not find environment variable:" + variable);
    }
  };

  if (Array.isArray(envVars)) {
    envVars.forEach(check);
  } else {
    check(envVars);
  }
};
