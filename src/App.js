import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


import { getWords } from './utilities/service';


function App() {
    const [dataWords, setDataWords] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [words, setWords] = useState([]);
    const [checked, setChecked] = useState(false);
    
    useEffect(() => {

        getWords().then((res) => {
            const data = res.data;
            setDataWords(data.data);            
        }).catch((e) => {
            console.log(e);
        })

    }, [])

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }  

    const onFilterLength = () => {
        if (Number(inputValue) === 0) {
            setWords(dataWords);
        }
        const filteredWorlds = dataWords.filter((world) => world.length > Number(inputValue));
        setWords(filteredWorlds);       
    }

    const onFilterSubstring = () => {
        let filteredWorlds;
        if (checked) {
            filteredWorlds = dataWords.filter((world) => world.indexOf(inputValue) !== -1 );            
        } else {
            filteredWorlds = dataWords.filter((world) => world.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1);
        }         
        setWords(filteredWorlds);       
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col> 
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="Введите текст или число"
                            value={inputValue}
                            onChange={handleChange}/>
                        <Form.Check 
                            type='checkbox'
                            id='checkbox'
                            label='Учитывать регистр'
                            checked={checked}
                            onChange={(e) => setChecked((s)=> !s)}
                        />
                        <Button variant='info' className='mr-3' onClick={onFilterLength}>Фильтр по длине слов</Button>
                        <Button variant='info'  onClick={onFilterSubstring}>Фильтр по подстроке</Button>          
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Поле вывода</h2>
                    <ul>
                        {words.map((word) => {
                            return <li key={word}>{word}</li>
                        })}                        
                    </ul>
                </Col>
            </Row>
        </Container>
                
    );
}

export default App;
