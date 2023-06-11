import { createMapper, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export type AutoMapper = Mapper;
export const mapper = createMapper({
    strategyInitializer: classes(),
})