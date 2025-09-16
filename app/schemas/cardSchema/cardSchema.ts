import * as v from 'valibot';
import { prefixer } from '~/shared/utils';
import type { Composer } from 'vue-i18n';

const pf = prefixer('schemas.column.');

export const getIdValidator = (t: Composer['t']) => v.pipe(v.string(), v.trim(), v.nonEmpty(t(pf('id.nonEmpty'))));
export const getNameValidator = (t: Composer['t']) => v.pipe(v.string(), v.trim(), v.maxLength(64, t(pf('name.maxLength'))));
