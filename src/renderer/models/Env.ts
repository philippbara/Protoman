import { EnvVars } from '../../core/env';

/*
  Environment variables - PostMan's double curly substitution feature
*/

export interface Env {
  readonly vars: ReadonlyArray<[string, string]>;
}

const MAX_NAME_LENGTH = 16;

export function validateNewEnvName(name: string, nameList: string[]): boolean {
  return MAX_NAME_LENGTH > name.length && name.length > 0 && !nameList.includes(name);
}

export function validateEnvName(newName: string, currentName: string, nameList: string[]): boolean {
  return currentName === newName || validateNewEnvName(newName, nameList);
}

export function toVarMap(env: Env): EnvVars {
  const a = env.vars.map(function(item) {
    return item[0] == 'NOW' ? ['NOW', Math.round(Date.now() / 1000)] : item;
  });
  const b = a.map(function(item) {
    return item[0] == 'VALIDITY' ? ['VALIDITY', Math.round(Date.now() / 1000 + 60 * 60 * 8)] : item;
  });
  return b.reduce((acc, [k, v]) => Object.assign(acc, { [k]: v }), {});
}
