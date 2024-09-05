import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import mime from 'mime';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../components/background/Background';
import {COLORS, FONT} from '../../assets/constants';
import GradientTextWhite from '../components/helpercComponent/GradientTextWhite';
import Clipboard from '@react-native-clipboard/clipboard';
import Loading from '../components/helpercComponent/Loading';
import {TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import axios from 'axios';
import UrlHelper from '../helper/UrlHelper';
import {
  useCreateCurrencyMutation,
  useCreateUPIAccountMutation,
  useGetAllLocationWithTimeQuery,
} from '../helper/Networkcall';

const countrytimezone = [
  {name: 'Afghanistan', timezone: 'Asia/Kabul'},
  {name: 'Albania', timezone: 'Europe/Tirane'},
  {name: 'Algeria', timezone: 'Africa/Algiers'},
  {name: 'Andorra', timezone: 'Europe/Andorra'},
  {name: 'Angola', timezone: 'Africa/Luanda'},
  {name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires'},
  {name: 'Armenia', timezone: 'Asia/Yerevan'},
  {name: 'Australia', timezone: 'Australia/Sydney'},
  {name: 'Austria', timezone: 'Europe/Vienna'},
  {name: 'Azerbaijan', timezone: 'Asia/Baku'},
  {name: 'Bahamas', timezone: 'America/Nassau'},
  {name: 'Bahrain', timezone: 'Asia/Bahrain'},
  {name: 'Bangladesh', timezone: 'Asia/Dhaka'},
  {name: 'Belarus', timezone: 'Europe/Minsk'},
  {name: 'Belgium', timezone: 'Europe/Brussels'},
  {name: 'Belize', timezone: 'America/Belize'},
  {name: 'Benin', timezone: 'Africa/Porto-Novo'},
  {name: 'Bhutan', timezone: 'Asia/Thimphu'},
  {name: 'Bolivia', timezone: 'America/La_Paz'},
  {name: 'Bosnia and Herzegovina', timezone: 'Europe/Sarajevo'},
  {name: 'Botswana', timezone: 'Africa/Gaborone'},
  {name: 'Brazil', timezone: 'America/Sao_Paulo'},
  {name: 'Brunei', timezone: 'Asia/Brunei'},
  {name: 'Bulgaria', timezone: 'Europe/Sofia'},
  {name: 'Burkina Faso', timezone: 'Africa/Ouagadougou'},
  {name: 'Burundi', timezone: 'Africa/Bujumbura'},
  {name: 'Cambodia', timezone: 'Asia/Phnom_Penh'},
  {name: 'Cameroon', timezone: 'Africa/Douala'},
  {name: 'Canada', timezone: 'America/Toronto'},
  {name: 'Cape Verde', timezone: 'Atlantic/Cape_Verde'},
  {name: 'Central African Republic', timezone: 'Africa/Bangui'},
  {name: 'Chad', timezone: 'Africa/Ndjamena'},
  {name: 'Chile', timezone: 'America/Santiago'},
  {name: 'China', timezone: 'Asia/Shanghai'},
  {name: 'Colombia', timezone: 'America/Bogota'},
  {name: 'Comoros', timezone: 'Indian/Comoro'},
  {name: 'Congo (Democratic Republic)', timezone: 'Africa/Kinshasa'},
  {name: 'Congo (Republic)', timezone: 'Africa/Brazzaville'},
  {name: 'Costa Rica', timezone: 'America/Costa_Rica'},
  {name: 'Croatia', timezone: 'Europe/Zagreb'},
  {name: 'Cuba', timezone: 'America/Havana'},
  {name: 'Cyprus', timezone: 'Asia/Nicosia'},
  {name: 'Czech Republic', timezone: 'Europe/Prague'},
  {name: 'Denmark', timezone: 'Europe/Copenhagen'},
  {name: 'Djibouti', timezone: 'Africa/Djibouti'},
  {name: 'Dominica', timezone: 'America/Dominica'},
  {name: 'Dominican Republic', timezone: 'America/Santo_Domingo'},
  {name: 'East Timor', timezone: 'Asia/Dili'},
  {name: 'Ecuador', timezone: 'America/Guayaquil'},
  {name: 'Egypt', timezone: 'Africa/Cairo'},
  {name: 'El Salvador', timezone: 'America/El_Salvador'},
  {name: 'Equatorial Guinea', timezone: 'Africa/Malabo'},
  {name: 'Eritrea', timezone: 'Africa/Asmara'},
  {name: 'Estonia', timezone: 'Europe/Tallinn'},
  {name: 'Eswatini', timezone: 'Africa/Mbabane'},
  {name: 'Ethiopia', timezone: 'Africa/Addis_Ababa'},
  {name: 'Fiji', timezone: 'Pacific/Fiji'},
  {name: 'Finland', timezone: 'Europe/Helsinki'},
  {name: 'France', timezone: 'Europe/Paris'},
  {name: 'Gabon', timezone: 'Africa/Libreville'},
  {name: 'Gambia', timezone: 'Africa/Banjul'},
  {name: 'Georgia', timezone: 'Asia/Tbilisi'},
  {name: 'Germany', timezone: 'Europe/Berlin'},
  {name: 'Ghana', timezone: 'Africa/Accra'},
  {name: 'Greece', timezone: 'Europe/Athens'},
  {name: 'Greenland', timezone: 'America/Nuuk'},
  {name: 'Grenada', timezone: 'America/Grenada'},
  {name: 'Guatemala', timezone: 'America/Guatemala'},
  {name: 'Guinea', timezone: 'Africa/Conakry'},
  {name: 'Guinea-Bissau', timezone: 'Africa/Bissau'},
  {name: 'Guyana', timezone: 'America/Guyana'},
  {name: 'Haiti', timezone: 'America/Port-au-Prince'},
  {name: 'Honduras', timezone: 'America/Tegucigalpa'},
  {name: 'Hungary', timezone: 'Europe/Budapest'},
  {name: 'Iceland', timezone: 'Atlantic/Reykjavik'},
  {name: 'India', timezone: 'Asia/Kolkata'},
  {name: 'Indonesia', timezone: 'Asia/Jakarta'},
  {name: 'Iran', timezone: 'Asia/Tehran'},
  {name: 'Iraq', timezone: 'Asia/Baghdad'},
  {name: 'Ireland', timezone: 'Europe/Dublin'},
  {name: 'Israel', timezone: 'Asia/Jerusalem'},
  {name: 'Italy', timezone: 'Europe/Rome'},
  {name: 'Jamaica', timezone: 'America/Jamaica'},
  {name: 'Japan', timezone: 'Asia/Tokyo'},
  {name: 'Jordan', timezone: 'Asia/Amman'},
  {name: 'Kazakhstan', timezone: 'Asia/Almaty'},
  {name: 'Kenya', timezone: 'Africa/Nairobi'},
  {name: 'Kiribati', timezone: 'Pacific/Tarawa'},
  {name: 'Kuwait', timezone: 'Asia/Kuwait'},
  {name: 'Kyrgyzstan', timezone: 'Asia/Bishkek'},
  {name: 'Laos', timezone: 'Asia/Vientiane'},
  {name: 'Latvia', timezone: 'Europe/Riga'},
  {name: 'Lebanon', timezone: 'Asia/Beirut'},
  {name: 'Lesotho', timezone: 'Africa/Maseru'},
  {name: 'Liberia', timezone: 'Africa/Monrovia'},
  {name: 'Libya', timezone: 'Africa/Tripoli'},
  {name: 'Liechtenstein', timezone: 'Europe/Vaduz'},
  {name: 'Lithuania', timezone: 'Europe/Vilnius'},
  {name: 'Luxembourg', timezone: 'Europe/Luxembourg'},
  {name: 'Madagascar', timezone: 'Indian/Antananarivo'},
  {name: 'Malawi', timezone: 'Africa/Blantyre'},
  {name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur'},
  {name: 'Maldives', timezone: 'Indian/Maldives'},
  {name: 'Mali', timezone: 'Africa/Bamako'},
  {name: 'Malta', timezone: 'Europe/Malta'},
  {name: 'Marshall Islands', timezone: 'Pacific/Majuro'},
  {name: 'Mauritania', timezone: 'Africa/Nouakchott'},
  {name: 'Mauritius', timezone: 'Indian/Mauritius'},
  {name: 'Mexico', timezone: 'America/Mexico_City'},
  {name: 'Micronesia', timezone: 'Pacific/Chuuk'},
  {name: 'Moldova', timezone: 'Europe/Chisinau'},
  {name: 'Monaco', timezone: 'Europe/Monaco'},
  {name: 'Mongolia', timezone: 'Asia/Ulaanbaatar'},
  {name: 'Montenegro', timezone: 'Europe/Podgorica'},
  {name: 'Morocco', timezone: 'Africa/Casablanca'},
  {name: 'Mozambique', timezone: 'Africa/Maputo'},
  {name: 'Myanmar', timezone: 'Asia/Yangon'},
  {name: 'Namibia', timezone: 'Africa/Windhoek'},
  {name: 'Nauru', timezone: 'Pacific/Nauru'},
  {name: 'Nepal', timezone: 'Asia/Kathmandu'},
  {name: 'Netherlands', timezone: 'Europe/Amsterdam'},
  {name: 'New Zealand', timezone: 'Pacific/Auckland'},
  {name: 'Nicaragua', timezone: 'America/Managua'},
  {name: 'Niger', timezone: 'Africa/Niamey'},
  {name: 'Nigeria', timezone: 'Africa/Lagos'},
  {name: 'North Korea', timezone: 'Asia/Pyongyang'},
  {name: 'North Macedonia', timezone: 'Europe/Skopje'},
  {name: 'Norway', timezone: 'Europe/Oslo'},
  {name: 'Oman', timezone: 'Asia/Muscat'},
  {name: 'Pakistan', timezone: 'Asia/Karachi'},
  {name: 'Palau', timezone: 'Pacific/Palau'},
  {name: 'Panama', timezone: 'America/Panama'},
  {name: 'Papua New Guinea', timezone: 'Pacific/Port_Moresby'},
  {name: 'Paraguay', timezone: 'America/Asuncion'},
  {name: 'Peru', timezone: 'America/Lima'},
  {name: 'Philippines', timezone: 'Asia/Manila'},
  {name: 'Poland', timezone: 'Europe/Warsaw'},
  {name: 'Portugal', timezone: 'Europe/Lisbon'},
  {name: 'Qatar', timezone: 'Asia/Qatar'},
  {name: 'Romania', timezone: 'Europe/Bucharest'},
  {name: 'Russia', timezone: 'Europe/Moscow'},
  {name: 'Rwanda', timezone: 'Africa/Kigali'},
  {name: 'Saint Kitts and Nevis', timezone: 'America/St_Kitts'},
  {name: 'Saint Lucia', timezone: 'America/St_Lucia'},
  {name: 'Saint Vincent and the Grenadines', timezone: 'America/St_Vincent'},
  {name: 'Samoa', timezone: 'Pacific/Apia'},
  {name: 'San Marino', timezone: 'Europe/San_Marino'},
  {name: 'Sao Tome and Principe', timezone: 'Africa/Sao_Tome'},
  {name: 'Saudi Arabia', timezone: 'Asia/Riyadh'},
  {name: 'Senegal', timezone: 'Africa/Dakar'},
  {name: 'Serbia', timezone: 'Europe/Belgrade'},
  {name: 'Seychelles', timezone: 'Indian/Mahe'},
  {name: 'Sierra Leone', timezone: 'Africa/Freetown'},
  {name: 'Singapore', timezone: 'Asia/Singapore'},
  {name: 'Slovakia', timezone: 'Europe/Bratislava'},
  {name: 'Slovenia', timezone: 'Europe/Ljubljana'},
  {name: 'Solomon Islands', timezone: 'Pacific/Guadalcanal'},
  {name: 'Somalia', timezone: 'Africa/Mogadishu'},
  {name: 'South Africa', timezone: 'Africa/Johannesburg'},
  {name: 'South Korea', timezone: 'Asia/Seoul'},
  {name: 'South Sudan', timezone: 'Africa/Juba'},
  {name: 'Spain', timezone: 'Europe/Madrid'},
  {name: 'Sri Lanka', timezone: 'Asia/Colombo'},
  {name: 'Sudan', timezone: 'Africa/Khartoum'},
  {name: 'Suriname', timezone: 'America/Paramaribo'},
  {name: 'Sweden', timezone: 'Europe/Stockholm'},
  {name: 'Switzerland', timezone: 'Europe/Zurich'},
  {name: 'Syria', timezone: 'Asia/Damascus'},
  {name: 'Taiwan', timezone: 'Asia/Taipei'},
  {name: 'Tajikistan', timezone: 'Asia/Dushanbe'},
  {name: 'Tanzania', timezone: 'Africa/Dar_es_Salaam'},
  {name: 'Thailand', timezone: 'Asia/Bangkok'},
  {name: 'Togo', timezone: 'Africa/Lome'},
  {name: 'Tonga', timezone: 'Pacific/Tongatapu'},
  {name: 'Trinidad and Tobago', timezone: 'America/Port_of_Spain'},
  {name: 'Tunisia', timezone: 'Africa/Tunis'},
  {name: 'Turkey', timezone: 'Europe/Istanbul'},
  {name: 'Turkmenistan', timezone: 'Asia/Ashgabat'},
  {name: 'Tuvalu', timezone: 'Pacific/Funafuti'},
  {name: 'Uganda', timezone: 'Africa/Kampala'},
  {name: 'Ukraine', timezone: 'Europe/Kiev'},
  {name: 'United Arab Emirates', timezone: 'Asia/Dubai'},
  {name: 'United Kingdom', timezone: 'Europe/London'},
  {name: 'United States', timezone: 'America/New_York'},
  {name: 'Uruguay', timezone: 'America/Montevideo'},
  {name: 'Uzbekistan', timezone: 'Asia/Tashkent'},
  {name: 'Vanuatu', timezone: 'Pacific/Efate'},
  {name: 'Vatican City', timezone: 'Europe/Vatican'},
  {name: 'Venezuela', timezone: 'America/Caracas'},
  {name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh'},
  {name: 'Yemen', timezone: 'Asia/Aden'},
  {name: 'Zambia', timezone: 'Africa/Lusaka'},
  {name: 'Zimbabwe', timezone: 'Africa/Harare'},
];

const Createcountry = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {accesstoken} = useSelector(state => state.user);

  const [countryname, setcountryname] = useState('');
  const [timezone, settimezone] = useState('');
  const [countrycurrencysymbol, setcountrycurrencysymbol] = useState('');
  const [
    countrycurrencyvaluecomparedtoinr,
    setcountrycurrencyvaluecomparedtoinr,
  ] = useState('');

  const [imageFileName, setImageFileName] = useState('Choose a file');
  const [mineImage, setMineImage] = useState(null);

  const [createCurrency, {isLoading, error}] = useCreateCurrencyMutation();

  const [imageSource, setImageSource] = useState(null);

  // For Opening PhoneStorage
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });

      if (doc) {
        console.log(doc);
        setMineImage(doc);
        setImageSource({uri: doc[0].uri});
        setImageFileName(doc[0].name);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const submitDeposit = async () => {
    if (!countryname) {
      Toast.show({type: 'error', text1: 'Enter country name'});
      return;
    }
    if (!countrycurrencysymbol) {
      Toast.show({type: 'error', text1: 'Enter country symbol'});
      return;
    }
    if (!countrycurrencyvaluecomparedtoinr) {
      Toast.show({
        type: 'error',
        text1: 'Enter currency value compared to INR',
      });
      return;
    }
    if (!imageSource) {
      Toast.show({type: 'error', text1: 'Add currency icon'});
      return;
    } else {
      console.log('Create UPI Running');
      try {
        const formData = new FormData();
        formData.append('countryname', countryname);
        formData.append("timezone", timezone);
        formData.append('countrycurrencysymbol', countrycurrencysymbol);
        formData.append(
          'countrycurrencyvaluecomparedtoinr',
          countrycurrencyvaluecomparedtoinr,
        );
        formData.append('countryicon', {
          uri: mineImage[0].uri,
          name: mineImage[0].name,
          type: mineImage[0].type || 'image/jpeg', // Default to 'image/jpeg' if type is null
        });

        console.log('FORM DATA :: ' + JSON.stringify(formData));

        const res = await createCurrency({
          accesstoken: accesstoken,
          body: formData,
        }).unwrap();

        console.log('Res :: ' + res);
        console.log('Res String :: ' + JSON.stringify(res));

        Toast.show({type: 'success', text1: 'Success', text2: res.message});
        navigation.goBack();
      } catch (error) {
        console.log('Error during deposit:', error);
        if (error.response) {
          Toast.show({type: 'error', text1: error.response.data});
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Request was made, but no response was received',
          });
        } else {
          Toast.show({type: 'error', text1: error.message});
        }
      }
    }
  };

  useEffect(() => {
    allTheDepositData();
  }, [isFocused, loadingAllData, allDepositdata]);

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const {data} = await axios.get(UrlHelper.ALL_UPI_API, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log('datat :: ' + JSON.stringify(data));
      setAllDepositData(data.payments);
      setLoadingAllData(false);
    } catch (error) {
      setLoadingAllData(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
      console.log(error);
    }
  };

  // FOR TIMEZONE

  const [showTimezone, setShowTimezone] = useState(false);
  const [seletedCountryTimezone, setSeletedCountryTimezone] = useState(null);

  const showAllCountryWithTimezone = () => {
    setShowTimezone(true);
  };

  const selectingCountryWithTimezone = item => {
    console.log('Seleted country timezone');
    console.log(item);
    setSeletedCountryTimezone(item);
    setcountryname(item.name);
    settimezone(item.timezone);
    setShowTimezone(false);
  };

  const [filterDataCN, setFilterDataCN] = useState(countrytimezone);

  const handleSearchCN = text => {
    const filtered = countrytimezone.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilterDataCN(filtered);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={-120}>
        <Background />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ImageBackground
            source={require('../../assets/image/tlwbg.jpg')}
            style={{
              width: '100%',
              height: heightPercentageToDP(85),
            }}
            imageStyle={{
              borderTopLeftRadius: heightPercentageToDP(5),
              borderTopRightRadius: heightPercentageToDP(5),
            }}>
            <View
              style={{
                height: heightPercentageToDP(85),
                width: widthPercentageToDP(100),
                borderTopLeftRadius: heightPercentageToDP(5),
                borderTopRightRadius: heightPercentageToDP(5),
              }}>
              <View
                style={{
                  height: heightPercentageToDP(5),
                  width: widthPercentageToDP(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: widthPercentageToDP(20),
                    height: heightPercentageToDP(0.8),
                    backgroundColor: COLORS.grayBg,
                    borderRadius: heightPercentageToDP(2),
                  }}
                />
              </View>
              <View style={{margin: heightPercentageToDP(2)}}>
                {showTimezone ? (
                  <View
                    style={{
                      height: heightPercentageToDP(7),
                      flexDirection: 'row',
                      backgroundColor: COLORS.white_s,
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(1),
                      marginTop: heightPercentageToDP(2),
                    }}>
                    <Fontisto
                      name={'search'}
                      size={heightPercentageToDP(3)}
                      color={COLORS.darkGray}
                    />
                    <TextInput
                      style={{
                        marginStart: heightPercentageToDP(1),
                        flex: 1,
                        fontFamily: FONT.Montserrat_SemiBold,
                        fontSize: heightPercentageToDP(2),
                        color: COLORS.black,
                        backgroundColor: COLORS.white_s,
                      }}
                      placeholder="Search for country"
                      placeholderTextColor={COLORS.black}
                      onChangeText={handleSearchCN}
                    />
                  </View>
                ) : (
                  <GradientTextWhite style={styles.textStyle}>
                    Create Country
                  </GradientTextWhite>
                )}
              </View>

              {/** FOR UPI DEPOSIT FORM */}

              <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets>
                {showTimezone ? (
                  <View
                    style={{
                      padding: heightPercentageToDP(2),
                    }}>
                    {/** country name */}
                    {filterDataCN.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => selectingCountryWithTimezone(item)}
                        style={{
                          borderRadius: heightPercentageToDP(2),
                          padding: heightPercentageToDP(1),
                        }}>
                        <LinearGradient
                          colors={[
                            COLORS.time_firstblue,
                            COLORS.time_secondbluw,
                          ]}
                          start={{x: 0, y: 0}} // start from left
                          end={{x: 1, y: 0}} // end at right
                          style={{
                            borderRadius: heightPercentageToDP(2),
                          }}>
                          <Text
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            cursorColor={COLORS.white}
                            placeholderTextColor={COLORS.black}
                            style={{
                              backgroundColor: 'transparent',
                              fontFamily: FONT.Montserrat_SemiBold,
                              color: COLORS.black,
                              padding: heightPercentageToDP(2.5),
                            }}>
                            {item.name}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View
                    style={{
                      padding: heightPercentageToDP(2),
                    }}>
                    {/** country name */}
                    <TouchableOpacity
                      onPress={showAllCountryWithTimezone}
                      style={{
                        borderRadius: heightPercentageToDP(2),
                        padding: heightPercentageToDP(1),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          paddingStart: heightPercentageToDP(1),
                        }}>
                        Country name
                      </Text>

                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                        }}>
                        <Text
                          underlineColor="transparent"
                          activeUnderlineColor="transparent"
                          cursorColor={COLORS.white}
                          placeholderTextColor={COLORS.black}
                          style={{
                            backgroundColor: 'transparent',
                            fontFamily: FONT.Montserrat_Regular,
                            color: COLORS.black,
                            padding: heightPercentageToDP(2.5),
                          }}>
                          {countryname === ''
                            ? 'Select a country'
                            : countryname}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/** country symbol */}

                    <View
                      style={{
                        borderRadius: heightPercentageToDP(2),
                        padding: heightPercentageToDP(1),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          paddingStart: heightPercentageToDP(1),
                        }}>
                        Currency name
                      </Text>

                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                        }}>
                        <TextInput
                          underlineColor="transparent"
                          activeUnderlineColor="transparent"
                          cursorColor={COLORS.white}
                          placeholderTextColor={COLORS.black}
                          style={{
                            backgroundColor: 'transparent',
                            fontFamily: FONT.Montserrat_Bold,
                            color: COLORS.black,
                          }}
                          value={countrycurrencysymbol}
                          onChangeText={text => setcountrycurrencysymbol(text)}
                        />
                      </LinearGradient>
                    </View>

                    {/** country icon */}

                    <TouchableOpacity
                      onPress={selectDoc}
                      style={{
                        borderRadius: heightPercentageToDP(2),
                        padding: heightPercentageToDP(1),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          paddingStart: heightPercentageToDP(1),
                        }}>
                        Icon
                      </Text>

                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            backgroundColor: 'transparent',
                            fontFamily: FONT.HELVETICA_REGULAR,
                            color: COLORS.black,
                            height: heightPercentageToDP(7),
                            textAlignVertical: 'center',
                            paddingStart: heightPercentageToDP(2),
                            fontSize: heightPercentageToDP(2),
                          }}>
                          {imageFileName}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingEnd: heightPercentageToDP(2),
                          }}>
                          <LinearGradient
                            colors={[COLORS.grayBg, COLORS.white_s]}
                            style={{borderRadius: 20, padding: 10}}>
                            <AntDesign
                              name={'upload'}
                              size={heightPercentageToDP(3)}
                              color={COLORS.darkGray}
                            />
                          </LinearGradient>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/** country val */}
                    <View
                      style={{
                        borderRadius: heightPercentageToDP(2),
                        padding: heightPercentageToDP(1),
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT.Montserrat_SemiBold,
                          color: COLORS.black,
                          fontSize: heightPercentageToDP(2),
                          paddingStart: heightPercentageToDP(1),
                        }}>
                        Currency value compared to INR
                      </Text>

                      <LinearGradient
                        colors={[COLORS.time_firstblue, COLORS.time_secondbluw]}
                        start={{x: 0, y: 0}} // start from left
                        end={{x: 1, y: 0}} // end at right
                        style={{
                          borderRadius: heightPercentageToDP(2),
                        }}>
                        <TextInput
                          underlineColor="transparent"
                          activeUnderlineColor="transparent"
                          cursorColor={COLORS.white}
                          placeholderTextColor={COLORS.black}
                          style={{
                            backgroundColor: 'transparent',
                            fontFamily: FONT.Montserrat_Bold,
                            color: COLORS.black,
                          }}
                          value={countrycurrencyvaluecomparedtoinr}
                          onChangeText={text =>
                            setcountrycurrencyvaluecomparedtoinr(text)
                          }
                        />
                      </LinearGradient>
                    </View>
                  </View>
                )}
              </ScrollView>

              {showTimezone ? null : (
                <View
                  style={{
                    marginBottom: heightPercentageToDP(5),
                    margin: heightPercentageToDP(2),
                  }}>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <TouchableOpacity
                      onPress={submitDeposit}
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
              )}
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Createcountry;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: heightPercentageToDP(4),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  textStyleContent: {
    fontSize: heightPercentageToDP(3),
    fontFamily: FONT.Montserrat_Bold,
    color: COLORS.black,
  },
  copycontent: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_Regular,
  },
  copytitle: {
    fontSize: heightPercentageToDP(2),
    color: COLORS.black,
    fontFamily: FONT.Montserrat_SemiBold,
  },
  inputContainer: {
    marginTop: heightPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    gap: heightPercentageToDP(2),
  },
  input: {
    height: heightPercentageToDP(7),
    flexDirection: 'row',
    backgroundColor: COLORS.white_s,
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  textInput: {
    marginStart: heightPercentageToDP(1),
    flex: 1,
    fontFamily: FONT.SF_PRO_REGULAR,
    color: COLORS.black,
  },
  subtitle: {
    fontFamily: FONT.Montserrat_SemiBold,
    fontSize: heightPercentageToDP(1.5),
    margin: 5,
  },
  userNameInput: {
    fontFamily: FONT.Montserrat_Regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
  },
});
