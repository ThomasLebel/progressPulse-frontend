import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../constants/theme";

interface HystoryWorkoutProps {
  name: string;
  date: string;
  stars: ReactNode;
  ressenti: string;
  workouts: ReactNode;
  sessionNumber?: number;
  accessibilityLabel?: string;
}

const COLLAPSED_HEIGHT = 96;

export default function HystoryWorkout({
  name,
  date,
  stars,
  ressenti,
  workouts,
  sessionNumber,
  accessibilityLabel,
}: HystoryWorkoutProps) {
  const [expanded, setExpanded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const cardHeight = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;
  const contentHeight = useRef(0);

  useEffect(() => {
    if (isReady && expanded) {
      Animated.timing(cardHeight, {
        toValue: contentHeight.current + COLLAPSED_HEIGHT,
        duration: 280,
        useNativeDriver: false,
      }).start();
    }
  }, [isReady, expanded]);

  const toggleCard = () => {
    if (expanded) {
      Animated.timing(cardHeight, {
        toValue: COLLAPSED_HEIGHT,
        duration: 280,
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
          {/* En-tête : badge session + date + chevron */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {sessionNumber !== undefined && (
                <View style={styles.sessionBadge}>
                  <Text style={styles.sessionBadgeText}>#{sessionNumber}</Text>
                </View>
              )}
              <Text style={styles.dateText} numberOfLines={1}>
                Séance du {date}
              </Text>
            </View>
            <FontAwesome
              name={expanded ? "chevron-up" : "chevron-down"}
              size={12}
              color={COLORS.textSecondary}
            />
          </View>

          {/* Étoiles */}
          <View style={styles.starsRow}>{stars}</View>

          {/* Contenu expandable (toujours rendu, opacity 0 quand fermé) */}
          <View
            style={{ opacity: expanded ? 1 : 0, width: "100%" }}
            onLayout={(event) => {
              if (contentHeight.current === 0) {
                contentHeight.current = event.nativeEvent.layout.height;
                setIsReady(true);
              }
            }}
          >
            {ressenti ? (
              <View style={styles.ressentiContainer}>
                <FontAwesome
                  name="quote-left"
                  size={10}
                  color={COLORS.textSecondary}
                  style={styles.quoteIcon}
                />
                <Text style={styles.ressentiText}>{ressenti}</Text>
              </View>
            ) : null}
            <View style={styles.exercisesContainer}>{workouts}</View>
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
    paddingTop: 14,
    paddingBottom: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  sessionBadge: {
    backgroundColor: "rgba(139, 195, 74, 0.13)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  sessionBadgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
  },
  dateText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  ressentiContainer: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 14,
    paddingLeft: 2,
  },
  quoteIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  ressentiText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontStyle: "italic",
    flex: 1,
    lineHeight: 18,
  },
  exercisesContainer: {
    width: "100%",
  },
});
