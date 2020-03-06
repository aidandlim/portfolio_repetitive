import React, { useState, useEffect } from 'react';

import { get, getType, getTypeSize } from '../../data';

import './index.css';

const Drill = ({ login, setMode }) => {
    const [numberOfDrill, setNumberOfDrill] = useState(-1);
    const [numberOfDone, setNumberOfDone] = useState(0);
    const [drillSet, setDrillSet] = useState([]);
    const [drillNums, setDrillNums] = useState([0, 0, 0]);
    const [isHint, setIsHint] = useState(false);

    useEffect(() => {
        let list = [];

        for (let i = 0; i < getTypeSize(); i++) {
            get(login, getType(i), res => {
                if(res.data.length === 0) {
                    alert(`It needs to have at least one data in ${getType(i)} list :(`);
                    setMode(0);
                }
                list[i] = res.data;
            });
        }

        setDrillSet(list);
    }, [login, setMode]);

    useEffect(() => {
        if (numberOfDrill !== -1) {
            if (numberOfDone < numberOfDrill) {
                let nums = [];

                for (let i = 0; i < getTypeSize(); i++) {
                    nums.push(Math.floor(Math.random() * drillSet[i].length));
                }

                setDrillNums(nums);
            } else {
                alert('Done!');
                setNumberOfDrill(-1);
                setNumberOfDone(0);
            }
        }
    }, [drillSet, numberOfDrill, numberOfDone]);

    const _handleForm = e => {
        e.preventDefault();

        const num = document.form_numofdrill.number.value;

        if (num !== '' && +num !== 0) {
            setNumberOfDrill(+document.form_numofdrill.number.value);
        }
    };

    const _handleHint = (manual) => {
        if (manual || isHint) {
            document.querySelector('.drill-process-english').style.display = 'none';
            document.querySelector('.drill-process-korean').style.display = 'block';
        } else {
            document.querySelector('.drill-process-english').style.display = 'block';
            document.querySelector('.drill-process-korean').style.display = 'none';
        }
        setIsHint(isHint => !isHint);
    };

    const _handleNext = () => {
        _handleHint(true);
        setNumberOfDone(num => num + 1);
    };

    return (
        <div className='default'>
            <div className='default-container'>
                {numberOfDrill === -1 ? (
                    <div className='drill-initialize'>
                        <form name='form_numofdrill' onSubmit={_handleForm}>
                            <p>Number of Drill</p>
                            <input type='number' name='number' />
                            <button type='submit'>START</button>
                        </form>
                    </div>
                ) : (
                    <div className='drill-process'>
                        <div className='drill-number'>{numberOfDone + 1} / {numberOfDrill}</div>
                        <div className='drill-process-text'>
                            <div className='drill-process-english'>
                                {drillSet.map((drill, index) => (
                                    <p className='drill-process-container' key={index}>
                                        {drill[drillNums[index]].english}
                                    </p>
                                ))}
                            </div>
                            <div className='drill-process-korean'>
                                {drillSet.map((drill, index) => (
                                    <p className='drill-process-container' key={index}>
                                        {drill[drillNums[index]].korean}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <button className='drill-process-hint' onClick={() => _handleHint(false)}>
                            HINT
                        </button>
                        <button className='drill-process-next' onClick={_handleNext}>
                            NEXT
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Drill;
