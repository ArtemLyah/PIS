import express from 'express';
import cors from 'cors'
import axios, { AxiosResponse } from 'axios';
import { PaginationResponse } from './types/PaginatioinResponse';
import { QuestionResponse } from './types/QuestionResponse';

const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('src/styles'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/questions', async (req, res) => {
  const { data } = await axios.get<any, AxiosResponse<PaginationResponse<QuestionResponse>>>('https://api.stackexchange.com/2.3/questions', {
    params: {
      page: 1,
      pagesize: 10,
      site: 'stackoverflow',
      sort: 'creation',
    },
  });

  res.render('questions', {
    questions: data.items,
  });
});

app.get('/liakh.artemii@lll.kpi.ua', async (req, res) => {
  res.render('me');
});

app.listen(3000, () => {
  console.log('Started on http://localhost:3000');
});