import React,{useState,useRef} from 'react';
import { FlatList,ViewToken } from 'react-native';

import { Bullet } from '../Bullet';


import { 
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props{
  imagesUrl:{
    id:string;
    photo:string;
  }[];
}

interface  ChangeImageProps{
  viewableItems: Array<ViewToken>,
  changed: Array<ViewToken>,
}

export const ImageSlider: React.FC<Props> = ({imagesUrl}) => {
  const [imageIndex, setImageIndex] = useState(0);

  //o onViewableItemsChanged precisa receber a referência da função e não a função diretamente. por que o FlatList renderiza somente objetos que estão visíveis
  //o useRef dar a referência do componente que está visível (esta na árvore naquele momento) no FlaList para onViewableItemsChanged
  const indexChanged = useRef((info: ChangeImageProps)=>{
    //console.log(info);
    const index = info.viewableItems[0].index; // aqui pega o index da imagem no array
    if(index !== null){
      setImageIndex(index);
    }
  });

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((item,index)=>(
            <Bullet
              key={item.id} 
              active={index === imageIndex}
            />
          ))
        }
      </ImageIndexes>
      
        <FlatList
          data={imagesUrl}
          keyExtractor={item=>item.id}
          renderItem={({item}) =>(
            <CarImageWrapper>
              <CarImage 
                source={{uri:item.photo}}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />
      
    </Container>
  );
}

