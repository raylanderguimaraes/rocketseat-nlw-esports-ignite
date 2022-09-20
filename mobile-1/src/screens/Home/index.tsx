
import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

export function Home() {

    const [games, setGames] = useState<GameCardProps[]>([]);

    const navigation = useNavigation();

    function handleOpengame({ id, title, bannerUrl }: GameCardProps) {

        navigation.navigate('game', { id, title, bannerUrl });

    }

    useEffect(() => {

        fetch('http://10.0.0.133:3333/games')
            .then(response => response.json())
            .then(data => setGames(data))


    }, []);

    return (

        <Background>
            <View style={styles.container}>

                <Image
                    source={logoImg}
                    style={styles.logo}

                />

                <Heading
                    title="Encontre seu Duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />
                <FlatList

                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (

                        <GameCard
                            data={item}
                            onPress={() => handleOpengame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </View>
        </Background>
    )
}