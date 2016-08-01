
export function exportNgModules(config) {
  if (!config || !config.ngModules) return config;
  // mutate
  config.ngModules.forEach(ngModule => {
    if (hasPropAndValues(ngModule, 'routes'))
      mergeConfigs(config, ngModule, 'routes')

    if (hasPropAndValues(ngModule, 'directives'))
      mergeConfigs(config, ngModule, 'directives')

    if (hasPropAndValues(ngModule, 'pipes'))
      mergeConfigs(config, ngModule, 'pipes')

    if (hasPropAndValues(ngModule, 'providers'))
      mergeConfigs(config, ngModule, 'providers')

  });

  return config;
}

export function mergeConfigs(config, ngModule, prop) {
  config[prop] = [].concat(config[prop], ngModule[prop]).filter(mod => Boolean(mod));
}

export function hasPropAndValues(config, prop) {
  return config[prop] !== undefined && Array.isArray(config[prop]) && config[prop].length;
}
