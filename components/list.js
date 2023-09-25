import { Text, View } from 'react-native'
import React, { Component } from 'react'

const list = ({ searchPhrase, setCLicked, data }) => {
    const renderItem = ({ item }) => {
      // when no input, show all
      if (searchPhrase === "") {
        return <Item name={item.name} details={item.details} />;
      }
      // filter of the name
      if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
      }
      // filter of the description
      if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
      }
    };
}



export {list};



