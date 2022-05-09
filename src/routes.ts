import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.get('/',(req,resp)=>{
  const retorno = {originReq: req.headers.origin,originAllow:process.env.CORS_ORIGIN};
  console.log(retorno)
  return resp.json({msg:"server ok"});
})

routes.post('/feedbacks', async (req,resp)=>{
  const { type, comment, screenshot } = req.body;
  

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter,
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });
  
  return resp.status(201).json({data:'ok'});
});