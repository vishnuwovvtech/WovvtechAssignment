import React,{Component} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Container, Text, Button, Picker, Card, CardItem, Body} from 'native-base';
import Axios from 'axios';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: 'date', 
            data: [], 
            page: 0,
            searchdata: []
        }
    }
    
    onhandleChange(text) {
        this.setState({search: text});
    }

    onValueChange(val) {
        this.setState({filter: val});
        if(val == 'title') {
            this.state.data.sort();
        } else if( val == 'date') {
            this.state.data.sort(function(a, b){ 
      
                return new Date(a.created_at) - new Date(b.created_at); 
            }); 
        }
    }
     
    getApiData() {
        // const data = [];
        let page = this.state.page;
        const URL = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        Axios.get(URL)
             .then(res => {
                 console.log('res', res.data.hits);    
                 this.setState({data: res.data.hits});
                data.push(res.data.hits);
                this.setState({data});
             })
             .catch(err => {
                 console.log('Error')
             })
    }
   
    componentDidMount() {
        this.getApiData();
        // setInterval(() => {
        //     this.getApiData();
        //     this.setState({page: this.state.page + 1});
        //     console.log('page', this.state.page)
        // }, 100000);
    }

    parseData(key) {
        this.props.navigation.push('Data', { data : key});
    }

    search() {
        // console.log('search',this.state.data.filter( ser => ser.title === this.state.filter));
        for (var i=0 ; i < this.state.data.length ; i++)
{
    if (this.state.data[i]['title'] == this.state.filter) {
        this.setState({searchdata: this.state.data[i]});
        
    }
    console.log('datta', this.state.searchdata);
}
    }
    render() {
      return(
        <>
    

 <ScrollView style={{flex:1}}>
         <View>
         <View style={{flex: 1, alignItems: 'center', justifyContent:'space-around', flexDirection: 'row', flexWrap: 'wrap'}}>
            <TextInput onChangeText={text => this.onhandleChange(text)} style={styles.inputField} />

            <TouchableOpacity style={{backgroundColor: '#1d60cc', padding: 12}} onPress={this.search()}>
                <Text style={{color: '#ffffff'}}>Search</Text>
            </TouchableOpacity>
            <Picker note mode="dialog" onValueChange={(val) => this.onValueChange(val)} selectedValue={this.state.filter}  style={{width: "40%", }}>
                  <Picker.Item label="Date" value="created_at" />
                  <Picker.Item label="Title" value="title" />
        </Picker>
        </View>

        <View>
        {
               this.state.data.map(
                   (key, i) => {
                       return(
                        <>
                         <View >
                         <Card key={i} onPress={() => this.parseData(key)}>
              
              <CardItem>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                      <View>
                          <Text style={{fontWeight: 'bold'}}>Title :</Text>
                      </View>
                      <View>
                           <Text>{key.title}</Text>
                      </View>
                  </View>
              </CardItem>
              <CardItem style={{marginTop: 0}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                      <View>
                          <Text style={{fontWeight: 'bold'}}>URL :</Text>
                      </View>
                      <View>
                           <Text>{key.url}</Text>
                      </View>
                  </View>
              </CardItem>
              <CardItem style={{marginTop: 0}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                      <View>
                          <Text style={{fontWeight: 'bold'}}>Created At :</Text>
                      </View>
                      <View>
                           <Text>{key.created_at}</Text>
                      </View>
                  </View>
              </CardItem>
              <CardItem style={{marginTop: 0}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                      <View>
                          <Text style={{fontWeight: 'bold'}}>Author :</Text>
                      </View>
                      <View>
                           <Text>{key.author}</Text>
                      </View>
                  </View>
              </CardItem>
            </Card>
                         </View>
                        </>
                       );
                   }
               )
           }
        </View>
         </View>
        </ScrollView> 
        </>
      )
    }

  }

  const styles = StyleSheet.create({
     container: {
         flex: 1, 
         flexWrap: 'wrap'
     }, 
     inputField: {
         borderWidth: 1, 
         borderRadius: 2, 
         borderColor: 'gray', 
         width: '60%' ,
         margin: 10
     }, 
     wrapper: {
         width: '100%'
     }, 
     button : {
         margin: 10
     }, 
  });
  