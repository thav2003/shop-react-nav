import React,{useState} from "react";
import {  Button,Text, Input, Icon } from "@ui-kitten/components";
import {Keyboard,View} from "react-native";

import filter from 'lodash.filter';


import searchbar_styles from "../../styles/searchbar_styles";


const SearchIcon = (style) => <Icon {...style} name='search' />;
const CrossIcon = (style) => <Icon {...style} name='close-outline' />;


const Searchbar=(props)=>{
    const handleSearch = text => {

        const formattedQuery = text.toString().toLowerCase();
        const filteredData = filter(props.fullData, objproduct => {
           
          return contains(objproduct, formattedQuery);
        });
        props.setData(filteredData);
        props.setSearchPhrase(text);
      };
    const contains = (objproduct, query) => {
            if (objproduct.firstName.toLowerCase().includes(query) ||objproduct.lastName.toLowerCase().includes(query)) {
                return true;
            }
            return false;
    };
    const Submit=()=>{
        props.setClicked(false);
        props.setData(props.fullData)
        props.setSearchPhrase("")
        Keyboard.dismiss()
    }
    return(
        <View style={searchbar_styles.container}>
            <View style={props.clicked ? searchbar_styles.searchBar__clicked : searchbar_styles.searchBar__unclicked}>
                <Input
                style={searchbar_styles.input}
                value={props.searchPhrase}
                placeholder='Search name'
                onSubmitEditing={Submit}
                accessoryLeft={SearchIcon}
                onChangeText={text=>handleSearch(text)}
                onFocus={() => {props.setClicked(true);}}
                />
             
            </View>
           
            {props.clicked && (
                <View>
                    <Button
                    appearance='ghost'
                    onPress={() => {
                    props.setSearchPhrase("")
                    Keyboard.dismiss();
                    props.setClicked(false);
                    props.setData(props.fullData)
                    
                    }}>
                    
                    Cancel</Button>
                </View>
            )}
        </View>
    )
}
export default Searchbar;
