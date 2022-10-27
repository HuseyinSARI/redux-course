import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Link } from "react-router-dom"





function CharacterCard({ character }) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (

        <Card  sx={{maxWidth: 345, backgroundColor: "#54B435" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {takeFirstWord(character.name)}
                    </Avatar>
                }
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                }
                title={character.name}
                subheader={character.occupation[0]}
            />
            <Link to={`/detail/${character.char_id}`}>
                <CardMedia
                    component="img"
                    image={character.img}
                    alt={character.name}
                    sx={{ objectFit: "inherit" }}
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Name : {character.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Nickname : {character.nickname}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Portrayed : {character.portrayed}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Link>
        </Card>
    )
}

const takeFirstWord = (str) => {
    let splittedStr = str.split(" ")
    if (splittedStr?.[1]) return (splittedStr?.[0][0] + splittedStr?.[1][0]);
    return splittedStr[0][0];
}

export default CharacterCard

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));