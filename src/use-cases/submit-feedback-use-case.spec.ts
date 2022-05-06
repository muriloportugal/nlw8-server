import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//jest.fn() é uma função que não tem função nenhuma, mas da para saber quando ela foi chamada.
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {create: createFeedbackSpy },
  {sendMail: sendMailSpy },
);

describe('Submit Feedback', () => {
  
  it('should be able to submit a feedback', async ()=>{
      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'Test comment',
        screenshot: 'data:image/png;base64,aihaihadadifaigjfagffd',
      })).resolves.not.toThrow();

      expect(createFeedbackSpy).toHaveBeenCalled(); //Verifica se a função foi chamada.
      expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Test comment',
      screenshot: 'data:image/png;base64,aihaihadadifaigjfagffd',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,aihaihadadifaigjfagffd',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with invalid screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Test comment',
      screenshot: 'aihaihadadifaigjfagffd',
    })).rejects.toThrow();
  });
});