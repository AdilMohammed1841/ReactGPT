import axios from 'axios';

export async function chatWithAI ( text: string = '' ) {
    if(text){
      const data = await axios.post('http://localhost:5000/chat',{prompt: text});
      if(data.status == 200) return data;
      else return {data : 'there might be some issue here'}
    } else {
        return {data: 'pass the text bro' }
    }
}