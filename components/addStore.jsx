import React, {Component} from 'react';
import ReactDOM from "react-dom";
import request from 'superagent';
import {Grid, Dropdown ,Label, Form, Input ,Button} from "semantic-ui-react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


class AddStores extends React.Component {
  constructor (props) {
      super(props);
      this.state = { zipcode:'',store: [],open:false,result:''};

    }

    zipCode(event){
      let code = event.target.value;
      this.setState({zipcode:code},function()
      {
        console.log(this.state.zipcode,"zip");
      });
    }

    storeDetails(event){
      let storeValue = event.target.value;
      this.setState({store:storeValue},function()
      {
        console.log(this.state.store,"store");
      });
    }

    handleSubmit(){
          let context = this;
          request.post('/addStore')
          .query({
              zipcode:context.state.zipcode,
              store:context.state.store})
          .end((err, res)=>{
            if (err) {
            alert('There is some error');
            } else {
              //alert('Store successfully added ');
              console.log(res,"for alert------");
              alert(res.text);
            }
          });

        }

    render () {
      const { country, region } = this.state;

      return (
        <div>

         <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column >
              <Label style={{backgroundColor:'#333f50',color:'#fbe5d6',fontSize:'12pt',fontFamily:'Poor Richard'}}>Country</Label>
            </Grid.Column>
            <Grid.Column >
              <Button style={{width:'95%'}} content='United States' icon='globe' labelPosition='left' />
           </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column >
              <Label style={{backgroundColor:'#333f50',color:'#fbe5d6',fontSize:'12pt',fontFamily:'Poor Richard'}}>Zipcode</Label>
            </Grid.Column>
            <Grid.Column >
              <Input style={{width:'95%',backgroundColor:'#333f50'}} placeholder='Zipcode' required="true" onChange={this.zipCode.bind(this)}/>
           </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column >
                <Label style={{backgroundColor:'#333f50',color:'#fbe5d6',fontSize:'12pt',fontFamily:'Poor Richard'}}>Store Name</Label>
              </Grid.Column>
              <Grid.Column >
                <Input style={{width:'95%',backgroundColor:'#333f50'}} placeholder='Store' required="true" onChange={this.storeDetails.bind(this)}/>
             </Grid.Column>
            </Grid.Row>
            <Grid.Row>
               <Button color='#e78c6f' style={{marginLeft:'35%'}} onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </Grid.Row>
          </Grid>

        </div>
      );
    }
  }
export default AddStores;
