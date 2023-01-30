import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Rating from '@mui/material/Rating';
import FavoriteIcon from './FavoriteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoriteList, removeFromFavouriteList } from '../../../features/favoriteSlice/favoriteSlice';
import { useNavigate } from 'react-router';
import { setBasketCount, setBasketItem, setBasketOpen } from '../../../features/basketSlice/basketSlice';


const CardItem = ({ item, index }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { favoriteList } = useSelector(state => state.favorite)
    const { basketOpen, basketItem } = useSelector((state) => state.basket);

    const handleAdd = (item) => {
        dispatch(setBasketOpen(basketOpen))
        dispatch(setBasketItem(item))
        dispatch(setBasketCount())
        console.log("clicked");
        dispatch(setBasketOpen(!basketOpen))
    };
    // console.log(basketOpen);
    // console.log(basketItem);

    const favoriteHandler = (item) => {


        if (favoriteList.includes(item)) {
            return dispatch(removeFromFavouriteList(item))


        }
        dispatch(addToFavoriteList(item))

    }

    return (
        <Card sx={{ maxWidth: 250, minWidth: 250, maxHeight: 350, minHeight: 350, margin: 2, padding: 2, background: "##F5F5F5" }} key={index}>
            <div style={{ textAlign: "end" }} onClick={() => favoriteHandler(item)}>
                <FavoriteIcon item={item} />
            </div>

            <CardMedia
                component="img"
                alt={item?.title}
                height="200"
                image={item?.image}
                style={{ objectFit: "contain", width: 250, height: 180, background: "white" }}
            />
            <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                    }} height={40} marginTop="0.5" fontSize="0.9rem" >
                        {item?.title}
                    </Typography>

                    <Typography variant="h5" color="primary"   >
                        <Rating name="read-only" value={item?.rating?.rate} readOnly marginTop="0" fontSize="1rem" />
                    </Typography>
                </div>

            </CardContent>
            <CardActions style={{ marginTop: "0", display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontSize="1rem" color="orange" fontWeight="600" >
                    {item?.price} TL
                </Typography>

                <div style={{ background: "#EDCF65", padding: "1rem", width: "4rem", display: "flex", justifyContent: "space-evenly" }}>
                    <RemoveRedEyeIcon
                        onClick={() => navigate("/productDetail", { state: item })} />
                    <ShoppingBasketIcon
                        onClick={() => handleAdd(item)}
                    />
                </div>

            </CardActions>
        </Card>
    )
}

export default CardItem