import * as React from "react";
import { FunctionComponent } from "react";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import {
    ClickAwayListener,
    Container,
    IconButton,
    Popper,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { CardItems } from "../CardItem";
import ClearIcon from "@mui/icons-material/Clear";
import { ISuggestionFilter } from "./ISuggestionFilter";
import { Fade } from "@mui/material";
import { useState } from "react";
import "./SuggestionFilter.css";
interface DynamicObject {
    [key: string]: any;
}

export const SuggestionFilter: FunctionComponent<ISuggestionFilter> = (props) => {
    const { itemsWithImg, limitItemsWithImg, limitCollection, limitSuggestion, order, minSearchLetter, customProduction } = props;
    const [renderItemsWImg, setRenderItemsWImg] = useState(itemsWithImg);
    const [renderSuggestion, setRenderSuggestion] = useState(itemsWithImg);
    const [renderCollection, setRenderCollection] = useState(itemsWithImg);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const clickAwayHandler = () => handleClose();

    /**
     * COMPONENTS FUNCTION
     */
    const ProductComponent = () => {
        return (<>
            <div className="search-label">PRODUCTS</div>
            {renderItemsWImg.length === 0 && <div>No result</div>}
            {(limitItemsWithImg ? renderItemsWImg.slice(0, limitItemsWithImg) : renderItemsWImg).map((item,index) => {
                return <a href={item.product.url}><CardItems {...item.product} key={index} /> </a>
            })}
        </>
        );
    }
    const SuggestionComponent = () => {
        let totalSuggestion: DynamicObject[] = [];
        let breakPoint = limitSuggestion?limitSuggestion:3;
        for (let index = 0; index < renderSuggestion.length; index++) {
            const item = renderSuggestion[index];
            if(!(totalSuggestion.filter((currentItem) => currentItem.term === item.suggestionWord.term).length>0)){
                console.log(item);
                totalSuggestion.push(item.suggestionWord);
            }
            if (breakPoint && totalSuggestion.length >= breakPoint){
                break;
            }
        }
        console.log(totalSuggestion);
        return (<>
            <div className="search-label">SUGGESTIONS</div>
                {totalSuggestion.length === 0 && <div>No result</div>}
                {totalSuggestion.map((item,index) => {
                    return <a className="link-item" href={item.url} key={index}>{item.term}</a>
                })}
            </>
        );
    }
    const CollectionComponent = () => {
        let totalCollection: DynamicObject[] = [];
        let breakPoint = limitCollection?limitCollection:3;
        for (let index = 0; index < renderCollection.length; index++) {
            const item = renderCollection[index];
            if(!(totalCollection.filter((currentItem) => currentItem.title === item.collection.title).length>0)){
                console.log(item);
                totalCollection.push(item.collection);
            }
            if (breakPoint && totalCollection.length >= breakPoint){
                break;
            }
        }
        console.log(totalCollection);
        return (<>
            <div className="search-label">COLLECTIONS</div>
                {totalCollection.length === 0 && <div>No result</div>}
                {totalCollection.map((item,index) => {
                    return <a className="link-item" href={item.url} key={index}>{item.title}</a>
                })}
            </>
        );
    }

    /**
     * HANDLER
     */
    const handleClose = () => {
        setOpen(false);
    };
    const updateResult = (key) => {
        let resultProduct = itemsWithImg.filter((item) => {
            return item.product.title.toLowerCase().includes(key.toLowerCase());
        });
        let resultSuggestion = itemsWithImg.filter((item) => {
            return item.suggestionWord.term.toLowerCase().includes(key.toLowerCase());
        });
        let resultCollection = itemsWithImg.filter((item) => {
            return item.collection.title.toLowerCase().includes(key.toLowerCase());
        });
        setRenderItemsWImg(resultProduct);
        setRenderSuggestion(resultSuggestion);
        setRenderCollection(resultCollection);
    }
    const handleChange = (event) => {
        setValues(event.target.value);
        if (!anchorEl) {
            const parent = event.currentTarget.parentNode;
            setAnchorEl(parent);
        }
        if (event && event.target.value !== "" && event.target.value.length >= minSearchLetter) {
            updateResult(event.target.value);
            setOpen(true);
        } else {
            handleClose();
        }
    };
    const handleClickClearText = () => {
        setValues("");
        handleClose();
    };
    const id = open ? "simple-popover" : undefined;

    /**
     * MAIN FUNCTION
     */
    return (
        <Container maxWidth="sm">
            <div aria-describedby={id}>
                <FormControl sx={{ m: 1 }} variant="standard">
                    {/* <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> */}
                    <Input
                        id="standard-adornment-amount"
                        value={values}
                        onChange={handleChange}
                        placeholder={"Search"}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 20 }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickClearText}
                                    edge="end"
                                >
                                    {values && <ClearIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <ClickAwayListener onClickAway={clickAwayHandler}>
                    <Popper
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        placement="bottom-start"
                        transition
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    {order.map(item =>{
                                        switch (item) {
                                            case "suggestion":
                                                return <SuggestionComponent />
                                                break;
                                            case "collection":
                                                return <CollectionComponent />
                                                break;
                                            default:
                                                return <ProductComponent />
                                                break;
                                        }
                                    })}
                                    {renderItemsWImg.length > 0 && <div className="">View more {renderItemsWImg.length - limitItemsWithImg}</div>}
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </ClickAwayListener>
            </div>
            <Typography sx={{ p: 2 }}>Text below the search.</Typography>
        </Container>
    );
}
