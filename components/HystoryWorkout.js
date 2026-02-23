import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../constants/theme";

export default function HystoryWorkout({
  name,
  date,
  stars,
  ressenti,
  workouts,
  accessibilityLabel,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const cardHeight = useRef(new Animated.Value(90)).current;
  const contentHeight = useRef(0);

  useEffect(() => {
    if (isReady && expanded) {
      Animated.timing(cardHeight, {
        toValue: contentHeight.current + 90,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isReady, expanded]);

  const toggleCard = () => {
    if (expanded) {
      Animated.timing(cardHeight, {
        toValue: 90,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    } else if (isReady) {
      setExpanded(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleCard}
      style={{ width: "100%" }}
      activeOpacity={1}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={[styles.card, { height: cardHeight }]}>
        {/* Barre d'accent gauche */}
        <View style={styles.accentBar} />

        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.nameText}>Séance du {date}</Text>
            </View>
            <FontAwesome
              name={expanded ? "minus-circle" : "plus-circle"}
              size={22}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.starContainer}>{stars}</View>

          <View
            style={{ opacity: expanded ? 1 : 0, width: "100%" }}
            onLayout={(event) => {
              if (contentHeight.current === 0) {
                contentHeight.current = event.nativeEvent.layout.height;
                setIsReady(true);
              }
            }}
          >
            <Text style={styles.ressentiText}>Ressenti : {ressenti}</Text>
            {workouts}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  accentBar: {
    width: 4,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleBlock: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },

  starContainer: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 4,
  },
  ressentiText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 10,
    marginTop: 8,
  },
});
