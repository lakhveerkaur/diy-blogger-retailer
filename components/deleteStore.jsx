import React, {Component} from 'react';
import ReactDOM from "react-dom";
import request from 'superagent';
import { Grid, Dropdown ,Label, Form, Input ,Button} from "semantic-ui-react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class DeleteStores extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
         zipcode:'',
         store: [],
         selectedStore:'',
       };

    }


    showZip(event)
    {
      let getCode = event.target.value;
      this.setState({zipcode:getCode},function()
      {
        console.log(this.state.zipcode,"zip");
        var arr1=[];
          var that =this;
          request.post('/getStore')
          .query({zipcode:that.state.zipcode})
          .end(function(err, res){
            if (err || !res.ok) {
              alert('Oh no! error');
            } else {
              if(res.body.details.store!=0){
                  console.log(res.body.details.store,"_________");
                      res.body.details.store.map((item)=>{
                         arr1.push({text: item ,value: item});
                      });
                     that.setState({store:arr1});
            }
     }

   });
      });
    }

    selectStore (evt,result) {
      this.setState({selectedStore:result.value});
    }

    deleteStore(){
      var context = this;
      request.post('/deleteStore')
      .query({ zipcode:context.state.zipcode,
              store: context.state.selectedStore})
      .end(function(err, res){
             if (err || !res.ok) {
               alert('Oh no! error');
             } else {
               alert('Store got deleted ');
                location.reload();
             }
           });
      // $.ajax({
      //   type:'POST',
      //   url:'/deletestores',
      //   data:{
      //     country:context.state.country,
      //     region:context.state.region,
      //     store: context.state.selectedStore
      //   },
      //   success:function(data){
      //       alert("success");
      //       location.reload();
      //   },
      //   error:function(err){
      //     alert("error");
      //   }
      // })
    }


    render () {

      return (
        <div>
        <Form>
          <Grid.Row style={{ margin: "12%" }}>
            <Grid.Column >
              <Button style={{width:'95%'}} content='United States'
                icon='globe'
                labelPosition='left' />
           </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ margin: "12%" }}>
            <Grid.Column>
              <Input style={{width:'95%',backgroundColor:'#333f50',color:'#fce9dd'}}
                placeholder='Zipcode' required="true"
                onChange={this.showZip.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ margin: "12%" }}>
            <Grid.Column>
              <Dropdown
                button
                className="icon "
                floating
                labeled
                icon="shopping basket"
                options={this.state.store}
                search
                placeholder="Select a Store"
                onChange={this.selectStore.bind(this)}
                style={{ border: "1px solid black", width: "95%",textAlign:'center'}}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ margin: "6%" }}>
            <Grid.Column>
              <Button negative style={{ marginLeft: "40%" }} onClick={this.deleteStore.bind(this)}>Delete </Button>
            </Grid.Column>
          </Grid.Row>
          </Form>
        </div>
      );
    }
}
export default DeleteStores;
