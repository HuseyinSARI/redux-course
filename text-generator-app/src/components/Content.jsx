/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Divider,
    Radio,
    RadioGroup,
    Button,
    Container,
    Tooltip,
    Switch
} from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchText } from '../redux/textSlice'

import { BsGithub } from 'react-icons/bs';
import { AiFillCode, AiFillLinkedin } from 'react-icons/ai';



function Content({ setTheme, theme }) {

    const { item, status, } = useSelector(state => state.text)
    const dispatch = useDispatch();
    const [radioValue, setRadioValue] = useState("text")
    const [sliderValue, setSliderValue] = useState(4)
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchText({ paras: sliderValue, format: radioValue }))
        }

        if (status === "loading") setIsLoading(true)

        if (status === "succeeded" || status === "failed" || status === "idle") setIsLoading(false)

    }, [status])

    const handleSwitch = () => {
        setTheme(prev => !prev)
    }

    const handleGet = () => {
        dispatch(fetchText({ paras: sliderValue, format: radioValue }))
    }

    return (
        <Container maxW='6xl' position="relative" className="p-3 dark:bg-slate-600 rounded">
            <Switch
                position="absolute"
                right={10}
                top={10}
                onChange={handleSwitch}
            >
                {theme ? "Dark" : "Light"}
            </Switch>
            <div
                className='bg-rose-400 absolute rounded-lg flex justify-evenly p-2 gap-3'   >
                <a href="https://github.com/HuseyinSARI">
                    <BsGithub size={25} />
                </a>
                <a href="https://github.com/HuseyinSARI/redux-course/tree/main/text-generator-app">
                    <AiFillCode size={25} />
                </a>
                <a href="https://www.linkedin.com/in/sarihuseyin/">
                    <AiFillLinkedin size={25} />
                </a>
            </div>
            <div className='text-center  text-3xl py-4'>
                Text Generator
            </div>
            <Divider />
            <div className='flex mb-4 pt-4'  >
                <Button
                    className='dark:text-black'
                    isLoading={isLoading}
                    loadingText={status}
                    paddingX={7}
                    marginRight={3}
                    maxWidth="fit-content" onClick={handleGet}>
                    Get Text
                </Button>
                <RadioGroup
                    className='flex'
                    marginRight={3}
                    onChange={setRadioValue} value={radioValue} defaultValue='text'>
                    <Radio paddingRight={3} value='text'>Text</Radio>
                    <Radio value='html'>Html</Radio>
                </RadioGroup>
                <Slider
                    minWidth="max-content"
                    onChange={setSliderValue} defaultValue={4} min={1} max={50} step={1}>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg='teal.500'
                        color='white'
                        placement='top'
                        label={`${sliderValue} Paragraphs`}
                    >
                        <SliderThumb boxSize={6} />
                    </Tooltip>

                </Slider>
            </div>
            <Divider />
            <div className='py-4'>
                <p className='text-justify'>
                    {item}
                </p>
            </div>
        </Container>
    )
}

export default Content