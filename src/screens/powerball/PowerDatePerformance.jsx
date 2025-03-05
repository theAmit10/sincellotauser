import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainBackgroundWithoutScrollview from '../../components/background/MainBackgroundWithoutScrollview';

import {heightPercentageToDP} from 'react-native-responsive-screen';
import Loading from '../../components/helpercComponent/Loading';
import {COLORS, FONT} from '../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import PowerballAllDateComp from '../../components/powerball/powerballalldates/PowerballAllDateComp';
import {useGetPowerDateBasedUponPowerTimeQuery} from '../../helper/Networkcall';
import {useSelector} from 'react-redux';

const PowerDatePerformance = ({route}) => {
  const navigation = useNavigation();

  const {item: powertime} = route.params;

  console.log('item :: ' + JSON.stringify(powertime));

  const [allPowerDate, setPowerDate] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 5;

  const {accesstoken} = useSelector(state => state.user);

  const {isLoading, data, isError} = useGetPowerDateBasedUponPowerTimeQuery({
    accesstoken,
    id: powertime._id,
    page,
    limit,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setPowerDate(data.powerDates);
    }
  }, [isLoading, data]);

  return (
    <MainBackgroundWithoutScrollview title={'All Date'}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={allPowerDate}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <PowerballAllDateComp
              key={item._id}
              time={item.powerdate}
              fromicon={'FontAwesome'}
              iconname={'edit'}
              fromIconDelete={'MaterialCommunityIcons'}
              iconNameDelete={'delete'}
              navigation={navigation}
              navigate={'PartnerPerformancePowerball'}
              item={item}
              powertime={powertime}
            />
          )}
        />
      )}
    </MainBackgroundWithoutScrollview>
  );
};

export default PowerDatePerformance;
