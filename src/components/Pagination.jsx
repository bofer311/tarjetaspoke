import React from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
}) => {
  // Limitar cuántos números de página se muestran alrededor de la página actual
  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // Crear un array de números de página que se mostrará en la paginación
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.pagination}>
      <Button onPress={onPrev} title="Anterior" disabled={currentPage === 1} />

      {/* Renderizar los números de página */}
      <View style={styles.pageNumbers}>
        {pageNumbers.map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => onPageChange(page)}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePage,
            ]}
          >
            <Text style={styles.pageText}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        onPress={onNext}
        title="Siguiente"
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  pageNumbers: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: "lightgray",
  },
  activePage: {
    backgroundColor: "red", // Color de la página activa
  },
  pageText: {
    fontSize: 16,
    color: "white",
  },
});

export default Pagination;
