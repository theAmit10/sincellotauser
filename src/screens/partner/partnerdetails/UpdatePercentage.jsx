import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainBackgound from '../../../components/background/MainBackgound';
import Loading from '../../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../../assets/constants';
import Textinput from '../../../components/tlwinput/Textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const UpdatePercentage = ({route}) => {
  const {data} = route.params;
  console.log(data);
  const [userid, setuserid] = useState('1090');
  const [profitpercentage, setprofitpercentage] = useState('');
  const [rechargepercentage, setrechargepercenge] = useState('');
  const [topPartnerUserid, setTopPartnerUserid] = useState('');
  const [subPartnerUserid, setSubPartnerUserid] = useState('');
  const [subSubPartnerUserid, setSubSubPartnerUserid] = useState('');

  return (
    <MainBackgound
      title={data.key1 === "removeuser" ? 'Remove User' : 'Update Percentage'}
      lefttext={'Aryan'}
      righttext={'1090'}>
      {/** USER ID */}
      <Textinput
        title="User ID"
        value={userid}
        onChangeText={text => setuserid(text)} // Updates inputValue state
        placeholder="Enter user id"
        editable={false}
      />

      {/* PROFIT PERCENTAGE */}
      {data.key1 === 'profit' && (
        <Textinput
          title="Profit Percentage"
          value={profitpercentage}
          onChangeText={text => setprofitpercentage(text)} // Updates inputValue state
          placeholder="Enter Profit Percentage"
        />
      )}

      {/* RECHARGE PERCENTAGE */}
      {data.key1 === 'recharge' && (
        <Textinput
          title="Recharge Percentage"
          value={rechargepercentage}
          onChangeText={text => setrechargepercenge(text)} // Updates inputValue state
          placeholder="Enter Recharge Percentage"
        />
      )}

      {/* TOP PARTNER USER ID */}
      {data.key1 === 'removeuser' && (
        <Textinput
          title="Top Partner User ID"
          value={topPartnerUserid}
          onChangeText={text => setTopPartnerUserid(text)} // Updates inputValue state
          placeholder="Enter Top Partner User ID"
        />
      )}

      {/* SUB PARTNER USER ID */}
      {data.key1 === 'removeuser' && (
        <Textinput
          title="Sub Partner User ID"
          value={subPartnerUserid}
          onChangeText={text => setSubPartnerUserid(text)} // Updates inputValue state
          placeholder="Enter Sub Partner User ID"
        />
      )}

      {/* SUB SUB PARTNER USER ID */}
      {data.key1 === 'removeuser' && (
        <Textinput
          title="Sub Sub Partner User ID"
          value={subSubPartnerUserid}
          onChangeText={text => setSubSubPartnerUserid(text)} // Updates inputValue state
          placeholder="Enter Sub Sub Partner User ID"
        />
      )}

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        {false ? (
          <Loading />
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.blue,
              padding: heightPercentageToDP(2),
              borderRadius: heightPercentageToDP(1),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONT.Montserrat_Regular,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </MainBackgound>
  );
};

export default UpdatePercentage;

const styles = StyleSheet.create({});
